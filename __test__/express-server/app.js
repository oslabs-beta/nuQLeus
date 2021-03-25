require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const app = express();

/** Require in nuQLeus package  **/

const nuqleus = require('nuqleus');


/** Initialize cors and process requests as a JSON  **/

app.use(cors());
app.use(express.json());

/**
 * @params { document, variables, operationName, result, context } 
 * @returns optional extensions object to be passed in options object
 *
**/
const extensions = ({ document, variables, operationName, result, context }) => ({
  runTime: context.startTime,
  query: context.query,
});

/**
 * @params request, response, graphQLParams
 * @returns required options object or callback to be passed in graphqlHTTP function
 *
**/
const options = (request, response, graphQLParams) => ({
  schema,
  context: { startTime: 300, query: graphQLParams.query },
  graphiql: true,
});


/**
 * @params options, extensions(optional)
 * @returns new options object to be passed in graphQLHTTP function
 * nuQleus.WrapOptions adds middleware to the schema and modfies the context 
 * and extensions fields to enable tracing data and visualization
 * 
**/
const newOptions = nuqleus.WrapOptions(options, extensions);


/** Initiate graphQL route, passing in new options created by nuQLeus **/

app.use('/graphql', graphqlHTTP(newOptions));

/** Connect to MongoDB **/

mongoose
  .connect(process.env.MONGO_URI,
    {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/** Start server on PORT 4000 **/

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const nuqleus = require('./nuqleus');

const app = express();

/** Initiate graphQL route * */

app.use(cors());
app.use(express.json());

// Users can still access the variables: { document, variables, operationName, result, context } 
const extensions = ({ document, variables, operationName, result, context }) => ({
  runTime: context.startTime,
  query: context.query
});

// Users can still access the variables: request, response, graphQLParams
const options = (request, response, graphQLParams) => ({
  schema,
  context: { startTime: 400, queryTimes: [], query: graphQLParams.query },
  graphiql: true,
});

const newOptions = nuqleus.WrapOptions(options, extensions);

app.use('/graphql', graphqlHTTP(newOptions));

// app.use('/nuqleus', nuqleus.use);

/** Connect to MongoDB * */

mongoose
  .connect(
    'mongodb+srv://jenny:Codesmith41@cluster0.nbdhe.mongodb.net/sample_mflix?retryWrites=true&w=majority',
    {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/** Start server on PORT 4000 * */

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

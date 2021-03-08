const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const { ResponsePath, responsePathAsArray, GraphQLType } = require('graphql');
const queryLevelTracing = require('./controllers/query-tracing');

const mongoose = require('mongoose');

const app = express();

/** Initiate graphQL route **/ 

//app.use(queryLevelTracing);

const extensions = ({
  document,
  variables,
  operationName,
  result,
  context,
}) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(
  '/graphql',
  graphqlHTTP((request) => {
    return {
      schema,
      context: { startTime: Date.now() },
      graphiql: true,
      extensions,
    };
  }),
);

/** Connect to MongoDB **/ 

mongoose.connect('mongodb+srv://jenny:Codesmith41@cluster0.nbdhe.mongodb.net/sample_mflix?retryWrites=true&w=majority', {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


/** Start server on PORT 4000 **/ 

app.listen(4000, () => {
  console.log('Listening on port 4000'); 
});




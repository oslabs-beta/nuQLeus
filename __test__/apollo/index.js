require('dotenv').config();
const { ApolloServer } = require('apollo-server');
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const { applyMiddleware } = require('graphql-middleware');
const connectDb = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');
const nuqleus = require('nuqleus');

connectDb();

// SAMPLE TEST INPUTS //
const contextObject = {
  models,
  joshTest: {},
};
// SAMPLE TEST INPUTS //
const contextFunction = ({ req, res }) => ({
  models,
  joshText: {},
});
// SAMPLE TEST INPUTS //
const fResponse = {
  formatResponse: (res, reqContext) => {
    res.http = {
      joshTracing: {
        startTime: new Date(reqContext.context.nuqleusStartTime).toISOString(),
        endTime: new Date(Date.now()).toISOString(),
      }
    };
  }
};

// WHAT THE USER NEEDS TO CREATE
const nuqleusServerObject = nuqleus.ApolloWrapOptions(
  typeDefs, resolvers, contextFunction, fResponse
);

const server = new ApolloServer({
  ...nuqleusServerObject,
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

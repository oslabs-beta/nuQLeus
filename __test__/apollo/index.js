const { ApolloServer } = require('apollo-server');
const connectDb = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');

connectDb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

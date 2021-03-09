const { ApolloServer } = require("apollo-server");
const connectDb = require("./config/db");
const typeDefs = require("./types/Listing");
const createResolver = require("./resolvers/mutations/createListing");
const deleteResolver = require("./resolvers/mutations/deleteListing");
const updateResolver = require("./resolvers/mutations/updateListing");
const queryResolver = require("./resolvers/queries/listings");
const models = require("./models/listing");

connectDb();

const server = new ApolloServer({
  typeDefs,
  createResolver,
  updateResolver,
  deleteResolver,
  queryResolver,
  context: { models },
});

server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
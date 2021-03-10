<<<<<<< HEAD
const { ApolloError } = require("apollo-server");

module.exports = async (_, { input }, { models }) => {
  try {
    newListing = await models.Listing.create(input);
=======
const { ApolloError } = require('apollo-server');

module.exports = async (_, { input }, { models }) => {
  try {
    const newListing = await models.Listing.create(input);
>>>>>>> main
    return newListing;
  } catch (e) {
    throw new ApolloError(e);
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> main

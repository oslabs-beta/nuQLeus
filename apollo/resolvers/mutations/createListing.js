const { ApolloError } = require('apollo-server');

module.exports = async (_, { input }, { models }) => {
  try {
    const newListing = await models.Listing.create(input);
    return newListing;
  } catch (e) {
    throw new ApolloError(e);
  }
};

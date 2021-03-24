const { ApolloError } = require('apollo-server');

//Take inputs from models folder and create a new item when the user on nuQLeus creates one
module.exports = async (_, { input }, { models }) => {
  try {
    const newListing = await models.Listing.create(input);
    return newListing;
  } catch (e) {
    throw new ApolloError(e);
  }
};

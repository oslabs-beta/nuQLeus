const { ApolloError } = require('apollo-server');

module.exports = async (_, { id }, { models }) => {
  const deleteListing = await models.Listing.deleteOne({ _id: id });

  if (deleteListing.deletedCount) return { id: id };
  else throw new ApolloError(`Failed to delete address.`);
};

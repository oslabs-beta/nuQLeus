const { ApolloError } = require('apollo-server');

//Take the id the user writes down, and delete the item matching the id in the database
module.exports = async (_, { id }, { models }) => {
  const deleteListing = await models.Listing.deleteOne({ _id: id });

  if (deleteListing.deletedCount) return { id: id };
  else throw new ApolloError(`Failed to delete address.`);
};

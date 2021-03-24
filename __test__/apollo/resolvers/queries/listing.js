const { ApolloError } = require('apollo-server');

//Given an id from models, search for the appropriate item in the database.
module.exports = async (_, { _id }, { models }) => {
  try {
    const listingToRead = await models.Listing.findOne({ _id: _id });
    if (!listingToRead) throw new ApolloError(`Could not find listing with id: '${_id}'.`, 400);
    return listingToRead;
  }
  catch (e) {
    throw new ApolloError(e);
  }
};

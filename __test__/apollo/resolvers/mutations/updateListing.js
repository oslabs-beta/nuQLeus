const { ApolloError } = require('apollo-server');

//Take id and input from the models and update that id with the new input
module.exports = async (_, { id, input }, { models }) => {
  try {
    const listingToUpdate = await models.Listing.findOne({ _id: id });

    if (!listingToUpdate) throw new ApolloError(`Could not find listing with id: '${id}'.`, 400);

    //create an array of object keys and for each,replace the current id with the new id
    Object.keys(input).forEach((value) => {
      listingToUpdate[value] = input[value];
    });

    const updatedListing = await listingToUpdate.save();

    return updatedListing;
  } catch (e) {
    throw new ApolloError(e);
  }
};

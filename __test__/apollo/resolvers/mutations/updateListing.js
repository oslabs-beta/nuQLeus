<<<<<<< HEAD
const { ApolloError } = require("apollo-server");
=======
const { ApolloError } = require('apollo-server');
>>>>>>> main

module.exports = async (_, { id, input }, { models }) => {
  try {
    const listingToUpdate = await models.Listing.findOne({ _id: id });

<<<<<<< HEAD
    if (!listingToUpdate)
      throw new ApolloError(`Could not find listing with id: '${id}'.`, 400);
=======
    if (!listingToUpdate) throw new ApolloError(`Could not find listing with id: '${id}'.`, 400);
>>>>>>> main

    Object.keys(input).forEach((value) => {
      listingToUpdate[value] = input[value];
    });

    const updatedListing = await listingToUpdate.save();

    return updatedListing;
  } catch (e) {
    throw new ApolloError(e);
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> main

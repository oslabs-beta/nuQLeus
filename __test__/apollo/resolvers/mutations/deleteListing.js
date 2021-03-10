<<<<<<< HEAD
const { ApolloError } = require("apollo-server");
=======
const { ApolloError } = require('apollo-server');
>>>>>>> main

module.exports = async (_, { id }, { models }) => {
  const deleteListing = await models.Listing.deleteOne({ _id: id });

  if (deleteListing.deletedCount) return { id: id };
  else throw new ApolloError(`Failed to delete address.`);
<<<<<<< HEAD
};
=======
};
>>>>>>> main

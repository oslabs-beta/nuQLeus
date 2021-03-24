//Search for all items in the database
module.exports = async (_, {}, { models }) => {
  return await models.Listing.find();
};

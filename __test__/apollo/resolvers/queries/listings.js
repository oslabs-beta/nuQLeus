module.exports = async (_, {}, { models }) => {
  return await models.Listing.find();
};
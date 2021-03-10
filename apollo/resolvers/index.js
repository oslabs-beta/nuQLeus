const mutations = require('./mutations');
const queries = require('./Queries');

module.exports = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
};

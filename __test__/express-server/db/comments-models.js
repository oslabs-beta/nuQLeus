const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  movie_id: { type: Schema.Types.ObjectId, ref: 'movie' },
  text: String,
  date: Date,
})

module.exports = mongoose.model('comment', commentSchema);
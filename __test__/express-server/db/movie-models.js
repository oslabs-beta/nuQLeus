const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  year: Number,
  runtime: Number,
  released: Date,
  poster: String,
  rated: String,
  cast: [String],
  plot: String,
  fullplot: String,
  lastupdated: Date,
  type: String,
  directors: [String],
  writers: [String],
  imdb: Object,
  awards: Object,
  languages: [String],
  countries: [String],
  genres: [String],
  tomatoes: Object,
  num_mflix_comments: Number
})

module.exports = mongoose.model('movie', movieSchema);
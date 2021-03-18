<<<<<<< HEAD
const mongoose = require("mongoose");
const { Schema } = mongoose;

=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

//AnimalSchema
>>>>>>> 5d31f101af7fca4d1bb7e671b23a520171683922
const ListingAndReviewsSchema = new Schema({
  _id: {
    type: String,
    trim: true,
  },

  listing_url: {
    type: String,
    trim: true,
  },

  name: {
    type: String,
    trim: true,
  },

  summary: {
    type: String,
    trim: true,
  },

  space: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  neighborhood_overview: {
    type: String,
    trim: true,
  },

  notes: {
    type: String,
    trim: true,
  },

  transit: {
    type: String,
    trim: true,
  },

  access: {
    type: String,
    trim: true,
  },

  interaction: {
    type: String,
    trim: true,
  },

  house_rules: {
    type: String,
    trim: true,
  },

  property_type: {
    type: String,
    trim: true,
  },

  room_type: { 
    type: String, 
    trim: true 
  },

  bed_type: { 
    type: String, 
    trim: true 
  },

  minimum_nights: { 
    type: String, 
    trim: true 
  },

  maximum_nights: { 
    type: String, 
    trim: true 
  },

  cancellation_policy: { 
    type: String, 
    trim: true 
  },

  last_scraped: {
    type: Date,
  },

  calendar_last_scraped: {
    type: Date,
  },

  accommodates: {
    type: Number 
  },

  bedrooms: {
    type: Number
  },

  beds: {
    type: Number
  },

  number_of_reviews: {
    type: Number,
  },

  bathrooms: {
    type: Number,
  },

  amenities: {
    type: [String],
  },

  price: {
    type: Number,
  },

  extra_people: {
    type: Number,
  },

  guests_included: {
    type: Number,
  },

  reviews: {
    type: [String],
  },

  images: {
    type: Object,
  },

  host: {
    type: Object,
  },

  address: {
    type: Object,
  },

  availability: {
    type: Object,
  },

  review_scores: {
    type: [String],
  },
});

<<<<<<< HEAD
const Listing = mongoose.model("listing", ListingAndReviewsSchema);
=======
const Listing = mongoose.model('listing', ListingAndReviewsSchema);
>>>>>>> 5d31f101af7fca4d1bb7e671b23a520171683922

module.exports = { Listing };

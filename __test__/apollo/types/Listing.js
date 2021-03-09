const { gql } = require("apollo-server");

module.exports = gql`
  type Listing {
    id: ID!
    listing_url: String
    name: String!
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: String
    calendar_last_scraped: String
    accommodates: Int
    bedrooms: Int
    beds: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    extra_people: Float
    guests_included: Int
    reviews: [String]
  }
  input CreateListingInput {
    listing_url: String
    name: String!
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: String
    calendar_last_scraped: String
    accommodates: Int
    bedrooms: Int
    beds: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    extra_people: Float
    guests_included: Int
    reviews: [String]
  }
  input UpdateListingInput {
    listing_url: String
    name: String!
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: String
    calendar_last_scraped: String
    accommodates: Int
    bedrooms: Int
    beds: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    extra_people: Float
    guests_included: Int
    reviews: [String]
  }
  input DeleteListingInput {
    listing_url: String
    name: String!
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: String
    calendar_last_scraped: String
    accommodates: Int
    bedrooms: Int
    beds: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    extra_people: Float
    guests_included: Int
    reviews: [String]
  }
  type DeletePayload {
    listing_url: String
    name: String!
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: String
    calendar_last_scraped: String
    accommodates: Int
    bedrooms: Int
    beds: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    extra_people: Float
    guests_included: Int
    reviews: [String]
  }
  type Query {
    listings: [Listing]
  }
  type Mutation {
    createListing(input: CreateListingInput!): Listing!
    updateListing(id: ID!, input: UpdateListingInput!): Listing!
    deleteListing(id: ID!): DeletePayload!
  }
`;
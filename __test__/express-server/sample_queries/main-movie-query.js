// First five full movie query:

query movies {
  movies (first: 4) {
    _id
    title
    year
    runtime
    released
    poster
    rated
    cast
    plot
    fullplot
    lastupdated
    type
    directors
    writers
    imdb {
      id
    }
    awards {
      wins
      nominations
      text
    }
    tomatoes {
      lastUpdated
    }
    languages
    countries
    genres
    num_mflix_comments
    comments {
      name
    }
  }
}
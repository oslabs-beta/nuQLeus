// First 10 movies with only title, cast, and comments fields
query movies {
  movies (first: 10) {
    title
    cast
    comments {
      name
    }
  }
}

// First 5 movies with only title and cast fields
query movies {
  movies (first: 5) {
    title
    cast
  }
}
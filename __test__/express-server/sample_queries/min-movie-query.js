query movies {
  movies (first: 10) {
    title
    cast
    comments {
      name
    }
  }
}
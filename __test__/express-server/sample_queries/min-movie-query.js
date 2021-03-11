query movies {
  movies (first: 10) {
    title
    cast
    comments {
      name
    }
  }
}

// 2nd Example
query movies {
  movies (first: 10) {
    title
    cast
  }
}
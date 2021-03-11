// Single comment
query {
  comment(id: "5a9427648b0beebeb6957b18") {
    _id
    name
    email
    text
    date
    movie_id
    movie
  }
}

// First 100 comments
query comments {
  comments(first: 100) {
    _id
    name
    email
    text
    date
    movie_id
    movie {
      title
    }
  }
}
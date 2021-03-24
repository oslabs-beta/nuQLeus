// addComment mutation:

mutation {
  addComment (name: "test", email: "test@gmail.com", movie_id: "573a1390f29313caabcd5293", text: "hello world", date:"03-04-2021") {
    _id
    text
  }
}
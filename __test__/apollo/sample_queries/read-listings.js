query listings {
  listings {
    name
    _id
  }
}


// -----
// query body
query AnyQueryName($_id: ID!) {
  listing(_id: $_id) {
    name
    _id
  }
}
// variables
{
  "_id": "1003530"
}
// -----

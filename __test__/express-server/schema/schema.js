const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const fakeBookDatabase = [
  { name:"Book 1", pages:432 , id:1},
  { name: "Book 2", pages: 32, id: 2},
  { name: "Book 3", pages: 532, id: 3 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt }
  })
})

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      //args passed by user while making query
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // Define how to get data from a database source

        return fakeBookDatabase.find((item) => item.id == args.id);
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.

module.exports = new GraphQLSchema({
  query: RootQuery
});

const graphql = require('graphql');
const Movie = require('../db/movie-models');
const Comment = require('../db/comments-models');
const types = require('./types');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, 
  GraphQLNonNull, GraphQLInputObjectType, GraphQLFloat, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

// const fakeBookDatabase = [
//   { name:"Book 1", pages:432 , id:1},
//   { name: "Book 2", pages: 32, id: 2},
//   { name: "Book 3", pages: 532, id: 3 }
// ]

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: types.MovieType,
      //args passed by user while making query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Define how to get data from a database source
        return Movie.findById(args.id);
      }
    },
    movies: {
      type: new GraphQLList(types.MovieType),
      args: { first: { type: GraphQLInt } },
      resolve(parent, args) {
        return Movie.find({}).limit(args.first);
      }
    },
    comment: {
      type: types.CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comment.findById(args.id);
      }
    },
    comments: {
      type: new GraphQLList(types.CommentType),
      args: { first: { type: GraphQLInt } },
      resolve(parent, args) {
        return Comment.find({}).limit(args.first);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation', 
  fields: {
    addMovie: {
      type: types.MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        runtime: { type: new GraphQLNonNull(GraphQLInt) },
        released: { type: new GraphQLNonNull(GraphQLString) },
        poster: { type: GraphQLString },
        rated: { type: GraphQLString },
        cast: { type: new GraphQLList(GraphQLString) },
        plot: { type: GraphQLString },
        fullplot: { type: GraphQLString },
        lastupdated: { type: GraphQLString },
        type: { type: GraphQLString },
        directors: { type: new GraphQLList(GraphQLString) },
        writers: { type: new GraphQLList(GraphQLString) },
        imdb: { type: new GraphQLInputObjectType({
          name: 'ImdbInput',
          fields: {
            rating: { type: GraphQLInt },
            votes: { type: GraphQLInt },
            id: { type: GraphQLInt }
          }
        })},
        awards: { type: new GraphQLInputObjectType({
          name: 'AwardsInput',
          fields: {
            wins: { type: GraphQLInt },
            nominations: { type: GraphQLInt },
            text: { type: GraphQLString },
          },
        }) },
        tomatoes: { type: new GraphQLInputObjectType({
          name: 'TomatoesInput',
          fields: {
            viewer: { 
              type: new GraphQLInputObjectType({
                name: 'ViewerInput',
                fields: () => ({
                  rating: { type: GraphQLInt },
                  numReviews: { type: GraphQLInt },
                  meter: { type: GraphQLInt }
                })
              })
            },
            lastUpdated: { type: GraphQLString }
          }
        }) },
        languages: { type: new GraphQLList(GraphQLString) },
        countries: { type: new GraphQLList(GraphQLString) },
        genres: { type: new GraphQLList(GraphQLString) },
        num_mflix_comments: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let movie = new Movie({
          title: args.title,
          year: args.year,
          runtime: args.runtime,
          released: args.released,
          poster: args.poster,
          rated: args.rated,
          cast: args.cast,
          plot: args.plot,
          fullplot: args.fullplot,
          lastupdated: args.lastupdated,
          type: args.type,
          directors: args.directors,
          writers: args.writers,
          imdb: args.imdb,
          awards: args.awards,
          tomatoes: args.tomatoes,
          languages: args.languages,
          countries: args.countries,
          genres: args.genres,
          num_mflix_comments: args.num_mflix_comments
        });
        return movie.save();
      }
    },
    addComment: {
      type: types.CommentType,
      args: {
       // _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        movie_id: { type: new GraphQLNonNull(GraphQLID)},
        text: { type: new GraphQLNonNull(GraphQLString) },
        date: { 
          type: GraphQLString,
          resolve() {
            return Date.now();
          }
        },
      },
      resolve(parent, args) {
        let comment = new Comment({
          //_id: args._id,
          name: args.name,
          email: args.email,
          movie_id: args.movie_id,
          text: args.text,
          date: args.date
        })
        return comment.save();
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

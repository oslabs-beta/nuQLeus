const graphql = require('graphql');
const Movie = require('../db/movie-models');
const Comment = require('../db/comments-models');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, 
  GraphQLNonNull, GraphQLInputObjectType, GraphQLSchema } = graphql;

  const ImdbType = new GraphQLObjectType({
    name: 'imdb',
    fields: () => ({
      rating: { type: GraphQLInt },
      votes: { type: GraphQLInt },
      id: { type: GraphQLInt }
    })
  });
  
  const AwardsType =  new GraphQLObjectType({
    name: 'awards',
    fields: () => ({
      wins: { type: GraphQLInt },
      nominations: { type: GraphQLInt },
      text: { type: GraphQLString },
    })
  });
  
  const TomatoesType = new GraphQLObjectType({
    name: 'tomatoes',
    fields: () => ({
      viewer: { 
        type: new GraphQLObjectType({
          name: 'viewer',
          fields: () => ({
            rating: { type: GraphQLInt },
            numReviews: { type: GraphQLInt },
            meter: { type: GraphQLInt }
          })
        })
      },
      lastUpdated: { type: GraphQLString }
    })
  });
  
  const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
      _id: { type: GraphQLID },
      title: { type: GraphQLString },
      year: { type: GraphQLInt },
      runtime: { type: GraphQLInt },
      released: { type: GraphQLString },
      poster: { type: GraphQLString },
      rated: { type: GraphQLString },
      cast: { type: new GraphQLList(GraphQLString) },
      plot: { type: GraphQLString },
      fullplot: { type: GraphQLString },
      lastupdated: { type: GraphQLString },
      type: { type: GraphQLString },
      directors: { type: new GraphQLList(GraphQLString) },
      writers: { type: new GraphQLList(GraphQLString) },
      imdb: { type: ImdbType },
      awards: { type: AwardsType },
      tomatoes: { type: TomatoesType },
      languages: { type: new GraphQLList(GraphQLString) },
      countries: { type: new GraphQLList(GraphQLString) },
      genres: { type: new GraphQLList(GraphQLString) },
      num_mflix_comments: { type: GraphQLInt },
      comments: { 
        type: new GraphQLList(CommentType),
        resolve(parent, args) {
          return Comment.find({ movie_id: parent._id })
        }
      }
    })
  });
  
  const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      movie_id: { type: GraphQLString },
      movie: { 
        type: MovieType,
        resolve(parent, args) {
          Movie.find({ _id: parent.movie_id }, (err, result) => {
            if (!result) return 'No movie found'
            else return result;
          })
        }
      },
      text: { type: GraphQLString },
      date: { type: GraphQLString },
    })
  });
  
  const InputMovieType = new GraphQLInputObjectType({
    name: 'MovieInput',
    fields: {
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
    }
  })

  module.exports = { MovieType, CommentType, InputMovieType }
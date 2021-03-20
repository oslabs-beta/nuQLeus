const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware');
const connectDb = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');

const nuqleus = require('./nuqleusTest');

connectDb();

// const traceResolvers = async (resolve, root, args, context, info) => {
//   const startTime = Date.now();
//   const result = await resolve(root, args, context, info);
//   const endTime = Date.now();

//   const pathArray = [];
//   let curPath = info.path;
//   do {
//     pathArray.push(curPath.key);
//     curPath = curPath.prev;
//   } while (curPath);

//   const resolverData = {
//     path: pathArray.reverse(),
//     startTime: new Date(startTime).toISOString(),
//     endTime: new Date(endTime).toISOString(),
//     fieldName: info.fieldName,
//     duration: endTime - startTime,
//     operation: info.operation.operation,
//     parentType: info.parentType,
//     returnType: info.returnType,
//   };

//   context.nuqleusQueryTimes.push(resolverData);
//   return result;
// };

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// const schemaWithMiddleWare = applyMiddleware(schema, traceResolvers);

// const server = new ApolloServer({
//   schema: schemaWithMiddleWare,
//   context: ({ req, res }) => ({
//     models,
//     nuqleusStartTime: Date.now(),
//     nuqleusQueryTimes: [],
//   }),
//   formatResponse: (response, requestContext) => {
//     const { context } = requestContext;
//     response.extensions = { 
//       nuQLeusTracing: {
//         startTime: new Date(context.nuqleusStartTime).toISOString(),
//         endTime: new Date(Date.now()).toISOString(),
//         duration: Date.now() - context.nuqleusStartTime,
//         resolvers: context.nuqleusQueryTimes,
//       }
//     };
//   },
// });



// const contextObject = {
//   models,
//   joshTest: {},
// };

// const contextFunction = ({ req, res }) => ({
//   models,
//   joshText: {},
// });

// const extensionsObject = {
//   joshTracing: {
//     wakeTime: new Date(),
//     sleepTime: new Date(),
//   }
// }

// const extensionsFunction = {
  
// }

// const nuqleusServerObject = nuqleus.ApolloWrapOptions({});


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

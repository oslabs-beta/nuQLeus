const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { applyMiddleware } = require('graphql-middleware');
const { ResponsePath, responsePathAsArray, GraphQLType } = require('graphql');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const queryLevelTracing = require('./controllers/query-tracing');
const schema = require('./schema/schema');

const app = express();

/** Initiate graphQL route * */

app.use(cors());
app.use(express.json());

/*
const extensions = ({
  document,
  variables,
  operationName,
  result,
  context,
}) => {
  //fs.writeFile(path.resolve(__dirname, './data/latest-query.json'), JSON.stringify(context.queryTimes), (err) => console.log(err));
  return {
    nuQLeusTracing: {
      startTime: new Date(context.startTime).toISOString(),
      endTime: new Date(Date.now()).toISOString(),
      duration: Date.now() - context.startTime,
      resolvers: context.queryTimes
    }
  };
};

const logInput = async (resolve, root, args, context, info) => {
  //console.log('info:', info);
  const startTime = Date.now();
  // console.log(`1. startTime: ${startTime}`)
  const result = await resolve(root, args, context, info)
  const endTime = Date.now();
  // console.log(`2. endTime: ${endTime}`)
  // console.log(`3. fieldName: ${JSON.stringify(info.fieldName)}`)
  // console.log(`4. duration: ${endTime - startTime}`) 

  const pathArray = [];
  let curPath = info.path;
  do {
    pathArray.push(curPath.key);
    curPath = curPath.prev
  }
  while (curPath)
  
  const resolverData = {
    path: pathArray.reverse(),
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString(), 
    fieldName: info.fieldName, 
    duration: endTime - startTime, 
    operation: info.operation.operation,
    parentType: info.parentType,
    returnType: info.returnType,
  }
  //!context.queryTimes[info.fieldName] ? context.queryTimes[info.fieldName] = []: null;
  //context.queryTimes[info.fieldName].push(resolverData)
  context.queryTimes.push(resolverData)
  //fs.writeFile(path.resolve(__dirname, './data/latest-query.json'), JSON.stringify(context.queryTimes), (err) => console.log(err));
  return result;
}

const schemaWithMiddleware = applyMiddleware(schema, logInput)
*/


function modifyOptions(options, extensions) {

  const traceResolvers = async (resolve, root, args, context, info) => {
    const startTime = Date.now();
    const result = await resolve(root, args, context, info);
    const endTime = Date.now();

    const pathArray = [];
    let curPath = info.path;
    do {
      pathArray.push(curPath.key);
      curPath = curPath.prev;
    } while (curPath);

    const resolverData = {
      path: pathArray.reverse(),
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      fieldName: info.fieldName,
      duration: endTime - startTime,
      operation: info.operation.operation,
      parentType: info.parentType,
      returnType: info.returnType,
    };

    context.nuqleusQueryTimes.push(resolverData);
    return result;
  };

  const processExtensions = (extensions) => {
    // If user has existing extensions
    if(extensions) {

      // if typeof extensions === function;
      // const newObj = { pastExtensions: extensions, nuQleusTracing: ... }
      return ({ document, variables, operationName, result, context }) => ({
        ...extensions,
        nuQLeusTracing: {
          startTime: new Date(context.nuqleusStartTime).toISOString(),
          endTime: new Date(Date.now()).toISOString(),
          duration: Date.now() - context.nuqleusStartTime,
          resolvers: context.nuqleusQueryTimes,
        },
      });
    }
      else {
      return ({ document, variables, operationName, result, context, }) => ({
        nuQLeusTracing: {
          startTime: new Date(context.nuqleusStartTime).toISOString(),
          endTime: new Date(Date.now()).toISOString(),
          duration: Date.now() - context.nuqleusStartTime,
          resolvers: context.nuqleusQueryTimes,
        },
      });
    }
  }

  // Options will always be an object:
  const context = options.context
    ? { ...options.context, nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] }
    : { nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] };
  
  const processedExtensions = processExtensions(options.extensions);
  
  return (request) => ({
    ...options,
    schema: applyMiddleware(options.schema, traceResolvers),
    context,
    extensions: processedExtensions,
  });
}

// Users can still access the variables: { document, variables, operationName, result, context } 
const extensions = ({ context }) => ({
  runTime: context.startTime,
  //nuQLeusTracing: nuQLeusExtensions(),
});

// Users can still access the variables: request, response, graphQLParams
const options = (request) => ({
  schema,
  context: { startTime: 400, queryTimes: [] },
  graphiql: true,
  extensions,
});

const newOptions = modifyOptions(options);

app.use('/graphql', graphqlHTTP(newOptions));

// Testing npm function

// const testOptions = {
//   schema: {},
//   context: { startTime: Date.now(), queryTimes: [] },
//   graphiql: true,
//   extensions,
// };

// const output = modifyOptions(testOptions);
// console.log(output);
// console.log(modifyOptions(testOptions));

//

/** Connect to MongoDB * */

mongoose
  .connect(
    'mongodb+srv://jenny:Codesmith41@cluster0.nbdhe.mongodb.net/sample_mflix?retryWrites=true&w=majority',
    {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/** Start server on PORT 4000 * */

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

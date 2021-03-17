const { applyMiddleware } = require('graphql-middleware');

const extensions = ({ context }) => ({
  nuQLeusTracing: {
    startTime: new Date(context.nuqleusStartTime).toISOString(),
    endTime: new Date(Date.now()).toISOString(),
    duration: Date.now() - context.nuqleusStartTime,
    resolvers: context.nuqleusQueryTimes,
  },
});

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

// Requires applyMiddleware dependency
// const schemaWithTracing = applyMiddleware(schema, traceResolvers);

// const newGraphQLObject = nuqleus(() => {schema, context, extensions});

function nuqleus() {
  app.use(
    '/graphql', graphqlHTTP(newGraphQLObject)
  );
}


// app.use(
//   '/graphql',
//   graphqlHTTP(newGraphQLObject)
// );


app.use(
  '/graphql',
  graphqlHTTP((request) => ({
    schema: schemaWithTracing,
    context: { startTime: Date.now(), queryTimes: [] },
    graphiql: true,
    extensions,
  }))
);

///////////////////////

// Generate React frontend on npm run nuqleus
//app.use('/nuqleus', nucleus());

// Original Client Endpoint

// <nuqleus>
// app.use(
//   '/graphql',
//   graphqlHTTP((request) => ({
//     schema: schema1,
//     graphiql: true,
//   }))
// );
//</nuqleus>



function modifyOptions(options) {

  const extensions = ({ context }) => ({
    nuQLeusTracing: {
      startTime: new Date(context.nuqleusStartTime).toISOString(),
      endTime: new Date(Date.now()).toISOString(),
      duration: Date.now() - context.nuqleusStartTime,
      resolvers: context.nuqleusQueryTimes,
    },
  });

  // Check if options is a callback or an object 
  // Check if options is an async callback 

  // If options is an object:
  return ({
    ...options,
    schema: applyMiddleware(options.schema, traceResolvers),
    context: { ...options.context, nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] },
    extensions: { ...options.extensions, ...extensions }
  })
}

const testOptions = {
  schema: {},
  context: { startTime: Date.now(), queryTimes: [] },
  graphiql: true,
  extensions,
}

const output = modifyOptions(testOptions);
console.log(output);
console.log(modifyOptions(testOptions));


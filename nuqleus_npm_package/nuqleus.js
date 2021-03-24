const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { exec } = require('child_process');

const nuqleus = {};

const connectToNuqleus = () => {
  exec('node server.js', { encoding: 'utf-8' });
};

/**
 * @param {*} options can be an object or a callback function
 * @param {*} clientExtensions optional callback function
 * @returns new options callback containing nuQleus tracing data 
 */
nuqleus.WrapOptions = (options, clientExtensions) => {
  // connectToNuqleus() starts an express server and serves nuQLeus GUI to localhost:3030/nuqleus
  connectToNuqleus();

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

  const extensions = ({ document, variables, operationName, result, context }) => {
    // Create another callback that modifies that OGExt and return a single object
    const nuqleusExt = ({ document, variables, operationName, result, context }) => ({
      nuQLeusTracing: {
        startTime: new Date(context.nuqleusStartTime).toISOString(),
        endTime: new Date(Date.now()).toISOString(),
        duration: Date.now() - context.nuqleusStartTime,
        resolvers: context.nuqleusQueryTimes,
      },
    });

    const newExt = nuqleusExt({ document, variables, operationName, result, context });

    // If clientExtensions does not exist, return nuqleus-tracing extensions
    if (!clientExtensions) return newExt;

    // If clientExtensions do exist, then process existing clientExtensions and combine into a single object with nuqleus-tracing extensions
    const originalExt = clientExtensions({ document, variables, operationName, result, context });
    return {
      ...originalExt,
      ...newExt,
    };
  };

  if (typeof options === 'object') {
    return (request, response, graphQLParams) => ({
      ...options,
      schema: applyMiddleware(options.schema, traceResolvers),
      context: options.context
        ? { ...options.context, nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] }
        : { nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] },
      extensions,
    });
  }
  if (typeof options === 'function') {
    return (request, response, graphQLParams) => {
      const originalOptions = options(request, response, graphQLParams);
      return {
        ...originalOptions,
        schema: applyMiddleware(originalOptions.schema, traceResolvers),
        context: originalOptions.context
          ? { ...originalOptions.context, nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] }
          : { nuqleusStartTime: Date.now(), nuqleusQueryTimes: [] },
        extensions,
      };
    };
  }
};

/**
 * @param {*} typeDefs required
 * @param {*} resolvers required
 * @param {*} clientContext optional; can be object or callback
 * @param {*} clientFormatResponse option; must be object with a formatResponse key
 * @param {*} clientInputs optional; can be spread with multiple callbacks
 * @returns object to be spread into the client's new ApolloServer() instance
 */
nuqleus.ApolloWrapOptions = (
  typeDefs,
  resolvers,
  clientContext,
  clientFormatResponse,
  ...clientInputs
) => {
  // connectToNuqleus() starts an express server and serves nuQLeus GUI to localhost:3030/nuqleus
  connectToNuqleus();
  // create executableSchema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // resolver level metrics invoked at each call
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

  // apply middleware to schema
  const schemaWithMiddleWare = applyMiddleware(schema, traceResolvers, ...clientInputs);

  /**
   * @returns must be a function that returns an object
   *
   * fuse client context object with nuQLeus context
   */
  const fuseContexts = () => {
    if (typeof clientContext === 'object') {
      return async ({ req, res }) => ({
        ...clientContext,
        nuqleusStartTime: Date.now(),
        nuqleusQueryTimes: [],
      });
    }
    if (typeof clientContext === 'function') {
      return async ({ req, res }) => ({
        ...clientContext({ req, res }),
        nuqleusStartTime: Date.now(),
        nuqleusQueryTimes: [],
      });
    }
  };

  /**
   * @returns must be a function that returns the response with an extensions object
   *
   * fuse client formatResponse function with nuQLeus formatResponse
   */
  const nuqleusFormatResponse = (response, requestContext) => {
    if (response.extensions) {
      response.extensions.nuQLeusTracing = {
        startTime: new Date(requestContext.context.nuqleusStartTime).toISOString(),
        endTime: new Date(Date.now()).toISOString(),
        duration: Date.now() - requestContext.context.nuqleusStartTime,
        resolvers: requestContext.context.nuqleusQueryTimes,
      };
    } else {
      response.extensions = {
        nuQLeusTracing: {
          startTime: new Date(requestContext.context.nuqleusStartTime).toISOString(),
          endTime: new Date(Date.now()).toISOString(),
          duration: Date.now() - requestContext.context.nuqleusStartTime,
          resolvers: requestContext.context.nuqleusQueryTimes,
        },
      };
    }
  };

  const fuseFormatResponse = () => (response, requestContext) => {
    clientFormatResponse.formatResponse(response, requestContext);
    nuqleusFormatResponse(response, requestContext);
  };

  /**
   * @returns object with schema, context, and formatResponse
   *
   * drop this object output into the client's new ApolloServer() instance
   */
  return {
    schema: schemaWithMiddleWare,
    context: fuseContexts(),
    formatResponse: fuseFormatResponse(),
  };
};

module.exports = nuqleus;

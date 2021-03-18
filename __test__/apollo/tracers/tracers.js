module.exports = (response) => {
  // create an extensions object in the query response
  response.extensions = {};

  // the below function traces start and end times, durations, and types, at resolver level
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
    console.log('TESTING: ', context.nuqleusQueryTimes);
    console.log('RESULT: ', result);
    return result;
  };

  // // create the parent object nuQLeusTracing and add the above result into the resolver key-value
  // const extensions = ({ document, variables, operationName, result, context }) => {
  // // Create another callback that modifies that OGExt and return a single object 
  // nuQLeusTracing: {
  //   startTime: new Date(context.nuqleusStartTime).toISOString(),
  //   endTime: new Date(Date.now()).toISOString(),
  //   duration: Date.now() - context.nuqleusStartTime,
  //   resolvers: context.nuqleusQueryTimes,
  // }
};

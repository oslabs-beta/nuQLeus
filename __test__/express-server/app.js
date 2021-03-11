const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const { applyMiddleware } = require('graphql-middleware');
const { ResponsePath, responsePathAsArray, GraphQLType } = require('graphql');
const queryLevelTracing = require('./controllers/query-tracing');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

/** Initiate graphQL route **/ 

//app.use(queryLevelTracing)
app.use(cors());
app.use(express.json());

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

app.use(
  '/graphql',
  graphqlHTTP({
      schema: schemaWithMiddleware,
      context: { startTime: Date.now(), queryTimes: [] }, 
      graphiql: true,
      extensions,
    })
);

/** Connect to MongoDB **/ 

mongoose.connect('mongodb+srv://jenny:Codesmith41@cluster0.nbdhe.mongodb.net/sample_mflix?retryWrites=true&w=majority', {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


/** Start server on PORT 4000 **/ 

app.listen(4000, () => {
  console.log('Listening on port 4000'); 
});




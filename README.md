# nuQLeus

Boost GraphQL endpoint testing capabilities with resolver-level performance metrics. 

<div align="center">
  <img src="./src/assets/images/temp-logo.png" width="225px" marginTop= "30px"/>
</div>


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/NuQLeus)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents
#
- [Description](#description)
- [Motivation](#motivation)
- [Features](#features)
- [Getting Started with nuQLeus](#Getting-Started-with-nuQLeus)
  - [Install Dependencies and Run Scripts](#Install-Dependencies-and-run-scripts)
  - [Import nuQLeus and Wrap Schema](#Import-nuQLeus-and-Wrap-Schema)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [Areas for Improvement](#areasforimprovement)
- [Authors](#authors)
- [License](#license)

<br>

## Description

NuQLeus is a lightweight, self-contained, GraphQL endpoint testing GUI that extracts resolver-level tracing performance metrics from GraphQL queries and mutations and allows an enduser to easily identify specific resolvers that are having a detrimental impact on application performance.  

<br>

## Motivation

1. There is a considerable amount of overhead associated with building out a GraphQL API for the first time. 
2. GraphQL APIs can be created using a multitude of different libraries such as Apollo Server and Express-GraphQL. 
3. The library that is selected to build a GraphQL API can limit what features and metadata are accessible.

The motivation for nuQLeus stems from the fact that there are a multitude of different libraries, each with varying sets of features, that can be used to implement a GraphQL API. The library that an enduser selected when first creating a GraphQL API can limit which metadata they will have access to; for example, GraphQL APIs setup via Apollo Server have access to resolver-level tracing metrics whle servers created with Express-GraphQL will not. nuQLeus seeks to help bridge this feature gap and enable an enduser to extract resolver-level tracing data from queries and mutations, regardless of which server they used to initially create their API.

<br>

## Features

* Simulate GraphQL queries and mutations in the nuQLeus environment
* Real-time tracing durations at individual resolver-level for GraphQL queries and mutations
* Processing and visualization of tracing data to help identify performance drop-offs at a glance

<br>

## Getting Started With nuQLeus

### **Install nuQLeus**

```javascript
npm install --save-dev nuqleus
```

<br>

### **Apollo Server Setup**

The Apollo Server constructor function accepts an object with properties that convey schema options. Simply pass the existing options object into the `nuqleus.ApolloWrapOptions` method to return a new options object to be passed into the `ApolloServer` constructor. 

```javascript
const { ApolloServer } = require('apollo-server');
const connectDb = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');
import nuqleus from 'nuqleus';

connectDb();

// 1. Define your context either as an object or function //
//    Add your models in here, if any                     //
const userContext = {
  models,
  sampleObject: {},
};

// 2. Define your formatResponse, if any, as an object //
const userFormatResponse = {
  formatResponse: (res, reqContext) => {
    res.http = {
      someUserHttp: {
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now()).toISOString(),
      }
    };
  }
};

// 3. Create a nuqleusServerObject using the ApolloWrapOptions method                   //
//    Allowable inputs: typeDefs, resolvers, context, formatResponse, ...resolverInputs //
const nuqleusServerObject = nuqleus.ApolloWrapOptions(
  typeDefs, resolvers, userContext, userFormatResponse
);

/**
 * If any resolverInputs will be inputted, they will be wrapped after 
 * the nuQLeusTraceResolver around your schema with the applyMiddleware method.
 * 
 * const schemaWithMiddleWare = applyMiddleware(clientSchema, nuqleusTraceResolvers, ...clientInputs);
 */

// 4. Spread the nuqleusServerObject into your new ApolloServer instance //
//    If you have any add'l options, add them in after
const server = new ApolloServer({
  ...nuqleusServerObject,
  // add'l user options,
  // add'l user options,
});

// 5. Run your server /
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

<br>

### **Express-GraphQL Setup**

Express-graphql's `graphqlHTTP` function accepts an options parameter that can either be an object or a function. Simply pass existing options into `nuqleus.WrapOptions` function to return a new options callback to pass into `graphqlHTTP`.

If users have `extensions`, simply pass the `extensions` callback into `nuqleus.WrapOptions` as a second optional argument.  

```js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const models = require('./models');
const nuqleus = require('./nuqleus');

const extensions = ({ document, variables, operationName, result, context }) => ({
  hello: context.hello,
});

const options = {
  schema,
  context: { models, hello: 'world' },
  graphiql: true,
};

const newOptions = nuqleus.WrapOptions(options, extensions);

app.use('/graphql', graphqlHTTP(newOptions));

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

```

<br>

### **Using the nuQLeus GUI**
The nuQLeus wrapper methods instantiate a server and serve the nuQLeus GUI whenever a user's GraphQL server is initialized. In order to access the nuQLeus GUI, navigate to http://localhost:3030/nuqleus while your server is running.

<br>

## Technologies

* GraphQL
* React
* Codemirror
* Graphql-middleware
* Victory 
* Express & Node.js
* Jest
* Supertest
* Enzyme 
* Webpack
* MongoDB

<br>

## Contributing

Development of nuQLeus is open source on Hithub through the tech accelerator umbrella OS Labs. We are grateful for the community's contribution to the project. Please read the [contribution documentation](contributing.md) to learn more on how you can participate in improvements.

<br>

## Areas for Improvement

* Functionality
  * Include additional GraphQL servers into nuQLeus coverage
    * Ex. graphql-yoga or graphql-helix
  * Add tracing capability for GraphQL subscriptions
  * Set up a database to store historical user inputs and results
    * Allow performance metric comparisons between past and present queries and mutations
    * Alternatively, use localStorage for comparisons
  * Add onChange user input checks so only valid body/variables can be submitted
  * Add introspection capability for users to break down their schemas/queries/mutations in the frontend
* UI/UX
  * Use React Router (or other method) to show multiple windows in the 
  * Include additional visualizations of relevant information users may find helpful
  * Convert the Victory graph library to a more widely-used alternative such as D3
* Code Base
  * Convert .js and .jsx code to .ts and .tsx
  * Implement CORS policy in wrapper for pre-set headers
    * Prevent the need for users to have to install and enable CORS
  * Refactor and improve code as seen

<br>

## Authors

* Daniel Perez [Daniel-P3](https://github.com/Daniel-P3)
* Jenny Hai [jhai420](https://github.com/jhai420)
* Joshua Kim [jkim000](https://github.com/jkim000)
* Zach Brucker [zbrucker](https://github.com/zbrucker)

<br>

## License

[MIT](https://opensource.org/licenses/mit-license.php)

<br>

## Links/Contacts

Email: nuqleusjs@gmail.com
[Landing Page](http://www.nuqleus.io/)
[LinkedIn](https://www.linkedin.com/company/nuqleus)

<br>

#
##### [Return to Top](#nuQLeus)
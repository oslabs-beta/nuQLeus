import React, { createContext, Component, useState } from 'react';

export const GraphContext = createContext();

const sampleBody = 
`query GetRates {
  rates(currency: "USD") {
    currency
  }
}`;

const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    body: sampleBody,
    variables: 'variables context test string',
    response: 'hello'
  });

  return (
    <GraphContext.Provider value={ [info, setInfo] }>
      {props.children}
    </GraphContext.Provider>
  );
}

export default GraphContextProvider;

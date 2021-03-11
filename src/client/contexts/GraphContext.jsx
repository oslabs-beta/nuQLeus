import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

const sampleBody = `query movies {
  movies (first: 5) {
    title
    cast
  }
}
`;

export const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: 'http://localhost:4000/graphql',
    body: sampleBody,
    variables: '{"first": "5"}',
    response: '',
    extensions: '',
    queryTime: '',
    resolverTime: ''
  });

  return (
    <GraphContext.Provider value={[ info, setInfo ]}>
      {props.children}
    </GraphContext.Provider>
  );
};

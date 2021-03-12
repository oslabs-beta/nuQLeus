import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

const sampleBody = `query movies {
  movies (first: 10) {
    title
    cast
  }
}
`;

const sampleVar = '{"username": "zbrucker"}';

export const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: 'http://localhost:4000/graphql',
    body: '',
    variables: '',
    response: '',
    extensions: '',
    queryTime: '',
    resolverTime: ''
  });

  return <GraphContext.Provider value={[info, setInfo]}>{props.children}</GraphContext.Provider>;
};

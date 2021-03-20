import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

const sampleBody = `query AnyQueryName($_id: ID!) {
  listing(_id: $_id) {
    name
    _id
  }
}
`;

const sampleVariable = `{
  "_id": "1003530"
}
`;

const sampleVar = '{"username": "zbrucker"}';

export const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: 'http://localhost:4001',
    body: sampleBody,
    variables: sampleVariable,
    response: '',
    extensions: '',
    queryTime: '',
    resolverTime: '',
    graphData: []
  });

  return <GraphContext.Provider value={[info, setInfo]}>{props.children}</GraphContext.Provider>;
};

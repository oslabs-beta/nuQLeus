import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

export const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: '',
    body: '',
    variables: '',
    response: '',
    extensions: '',
    queryTime: '',
    resolverTime: '',
    graphData: []
  });

  return <GraphContext.Provider value={[info, setInfo]}>{props.children}</GraphContext.Provider>;
};

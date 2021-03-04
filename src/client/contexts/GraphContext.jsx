import React, { createContext, Component } from 'react';

export const GraphContext = createContext();

const sampleBody = 
`query GetRates {
  rates(currency: "USD") {
    currency
  }
}`;

class GraphContextProvider extends Component {

  state = {
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    body: sampleBody,
    variables: 'variables context test string',
    response: 'response context test string'
  }

  render() { 
    return (
      <GraphContext.Provider value={{...this.state}}>
        {this.props.children}
      </GraphContext.Provider>
    );
  }
}
 
export default GraphContextProvider;

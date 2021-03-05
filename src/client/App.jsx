import React from 'react';
import { GraphContextProvider } from './contexts/GraphContext';
import MainContainer from './containers/MainContainer';

const App = () => {
  return (
    <div id="app-container" className="container">
      <GraphContextProvider>
        <MainContainer />
      </GraphContextProvider>
    </div>
  )
};

export default App;

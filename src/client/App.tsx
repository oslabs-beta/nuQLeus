import React from 'react';
import ReactDOM, { render } from 'react-dom';
import GraphContextProvider, { GraphContext } from './contexts/GraphContext';
import MainContainer from './containers/MainContainer';

const App: React.FC = () => {
  return (
    <div id="app-container" className="container">
      <GraphContextProvider>
        <MainContainer />
      </GraphContextProvider>
    </div>
  )
};

export default App;

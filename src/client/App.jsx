import React from 'react';
import { GraphContextProvider } from './contexts/GraphContext';
import MainContainer from './containers/MainContainer';
import NavBar from './components/NavBar';
import "./stylesheets/styles.css";

const App = () => (
  <div id="app-container" className="container">
    <GraphContextProvider>
      <NavBar/>
      <MainContainer />
    </GraphContextProvider>
  </div>
);

export default App;

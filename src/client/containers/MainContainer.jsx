import React from 'react';
import LeftContainer from './LeftContainer';
import MiddleContainer from './MiddleContainer';

const MainContainer = () => (
  <div id="main-container" className="container">
    <LeftContainer />
    <MiddleContainer />
  </div>
);

export default MainContainer;

import React from 'react';
import { LeftContainer } from './LeftContainer';
import { MiddleContainer } from './MiddleContainer';

const MainContainer: React.FC = () => {
  return (
    <div id="main-container" className="container">
      <LeftContainer />
      <MiddleContainer />
    </div>
  )
}


export default MainContainer;

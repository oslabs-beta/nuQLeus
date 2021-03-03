import React from 'react';
import { LeftContainer } from './LeftContainer';
import { MiddleContainer } from './MiddleContainer';

const MainContainer: React.FC = () => {
  return (
    <div>
      <LeftContainer />
      <MiddleContainer />
    </div>
  )
}


export default MainContainer;

import React from 'react';
import LeftContainer from './LeftContainer';
import MiddleContainer from './MiddleContainer';
import RightContainer from './RightContainer';
const MainContainer = () => (
  <div id='main-container' className='container'>
    <LeftContainer />
    <MiddleContainer />
    <RightContainer />
  </div>
);

export default MainContainer;

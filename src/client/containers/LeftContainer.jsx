import React from 'react';
import ServerField from '../components/ServerField';
import VariableField from '../components/VariableField';
import QueryField from '../components/QueryField';

const LeftContainer = () => (
  <div id="left-container" className="container">
    <ServerField />
    <QueryField />
    <VariableField />
  </div>
);

export default LeftContainer;

import React from 'react';
import ServerField from '../components/ServerField';
import VariableField from '../components/VariableField';
import QueryEditor from '../components/QueryEditor';

const LeftContainer = () => (
  <div id="left-container" className="container">
    <ServerField />
    <QueryEditor />
    <VariableField />
  </div>
);

export default LeftContainer;

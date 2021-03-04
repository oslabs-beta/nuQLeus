import React from 'react';
import { QueryField } from '../components/QueryField';
import { ServerField } from '../components/ServerField';
import { VariableField } from '../components/VariableField';


  
export const LeftContainer = () => {  
  return (
    <div id="left-container" className="container">
      <ServerField />
      <QueryField />
      <VariableField />
    </div>
  )
};

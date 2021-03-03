import React from 'react';
import { QueryField } from '../components/QueryField';
import { ServerField } from '../components/ServerField';
import { VariableField } from '../components/VariableField';

export interface LeftContainerProps {
  text?: string;
};
  
export const LeftContainer: React.FC<LeftContainerProps> = () => {  
  return (
    <div id="left-container" className="container">
      <ServerField />
      <QueryField />
      <VariableField />
    </div>
  )
};

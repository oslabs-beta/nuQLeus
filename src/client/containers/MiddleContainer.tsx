import React from 'react';
import { OutputDisplay } from '../components/OutputDisplay';

export interface MiddleContainerProps {
  text?: string;
};
  
export const MiddleContainer: React.FC<MiddleContainerProps> = () => {  
  return (
    <div id="middle-container" className="container">
      <OutputDisplay />
    </div>
  )
};

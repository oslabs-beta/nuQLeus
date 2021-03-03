import React from 'react';


export interface OutputDisplayProps {
  text?: string;
};

export const OutputDisplay: React.FC<OutputDisplayProps> = () => {
  return (
    <div>
      <label>
        Output: 
        <input id="output-display" type="text" />
      </label>
    </div>
  )
};

import React from 'react';


export interface VariableFieldProps {
  text?: string;
};

export const VariableField: React.FC<VariableFieldProps> = () => {
  return (
    <div>
      <label>
        Variable: 
        <input id="variable-input" type="text" />
      </label>
    </div>
  )
};

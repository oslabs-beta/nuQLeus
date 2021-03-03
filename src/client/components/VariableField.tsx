import React from 'react';


export interface VariableFieldProps {
  text?: string;
};

export const VariableField: React.FC<VariableFieldProps> = () => {
  return (
    <div>
      <label>
        Variable: 
        <input id="variable-input" className="input" type="text" />
      </label>
    </div>
  )
};

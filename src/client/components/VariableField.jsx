import React, { useContext, useState, MouseEvent } from 'react';
import { GraphContext } from '../contexts/GraphContext';

export const VariableField = () => {
  return (
    <div>
      <label>
        Variable: 
        <textarea id="variable-input" className="input" type="text" defaultValue={ value.variables }/>
      </label>
    </div>
  )
};

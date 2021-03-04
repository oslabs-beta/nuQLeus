import React, { useContext, useState, MouseEvent } from 'react';
import { GraphContext } from '../contexts/GraphContext';

const VariableField = () => {
  const [info, setInfo] = useContext(GraphContext);

  return (
    <div>
      <label>
        Variable: 
        <textarea id="variable-input" className="input" type="text" defaultValue={info.variables} />
      </label>
    </div>
  )
};

export default VariableField;

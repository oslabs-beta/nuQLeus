import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

export const QueryField = () => {
  const value = useContext(GraphContext);

  return (
    <div>
      <label>
        Query: 
        <textarea id="query-input" className="input" type="text" defaultValue={ value.body }/>
      </label>
    </div>
  )
};

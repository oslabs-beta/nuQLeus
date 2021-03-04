import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

export const QueryField = () => {
  const [info, setInfo] = useContext(GraphContext);

  return (
    <div>
      <label>
        Query: 
        <textarea id="query-input" className="input" type="text" defaultValue={ info.body }/>
      </label>
    </div>
  )
};

import React from 'react';


export interface QueryFieldProps {
  text?: string;
};

export const QueryField: React.FC<QueryFieldProps> = () => {
  return (
    <div>
      <label>
        Query: 
        <input id="query-input" type="text" />
      </label>
    </div>
  )
};

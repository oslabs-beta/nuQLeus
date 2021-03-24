import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

const EmptyTracingData = () => {
  const [info, setInfo] = useContext(GraphContext);

  const message = info.extensions === '' ? '' : 'No tracing data available';
  return (
    <div className="no-tracing">
      <div><h3 className="no-tracing-msg">{message}</h3></div>
    </div>
  );
};

export default EmptyTracingData;

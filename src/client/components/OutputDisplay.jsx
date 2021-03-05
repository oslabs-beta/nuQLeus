import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

const OutputDisplay = () => {
  const { info, setInfo } = useContext(GraphContext);

  return (
    <div>
      <span>Output</span>
      <div id="output-display" className="output">
        {JSON.stringify(info.response)}
      </div>
    </div>
  );
};

export default OutputDisplay;

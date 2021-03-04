import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';



export const OutputDisplay = () => {
  const [info, setInfo] = useContext(GraphContext);
  console.log('TESTING INFO: ', info)

  return (
    <div>
      <span>Output</span>
      <div id="output-display" className="output">
        {info.response}
      </div>
    </div>
  )
};

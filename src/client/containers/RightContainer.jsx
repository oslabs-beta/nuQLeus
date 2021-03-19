import React, { useContext } from 'react';
import VisualDisplay from '../components/VisualDisplay';
import EmptyTracingData from '../components/EmptyTracingData';
import { GraphContext } from '../contexts/GraphContext';

const RightContainer = () => {

  const [info, setInfo] = useContext(GraphContext);

  const conditionRender = info.extensions ? <VisualDisplay /> : <EmptyTracingData/>;

  return (
    <div id="right-container" className="container">
    <h3>Tracing Data</h3>
      {conditionRender}
    </div>
  )
};

export default RightContainer;

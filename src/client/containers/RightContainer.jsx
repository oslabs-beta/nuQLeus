import React, { useContext } from 'react';
import ExtensionDisplay from '../components/ExtensionDisplay';
import VisualDisplay from '../components/VisualDisplay';
import { GraphContext } from '../contexts/GraphContext';

const RightContainer = () => {

  const [info, setInfo] = useContext(GraphContext);

  const conditionRender = info.queryTime ? <VisualDisplay /> : null;

  return (
    <div id="right-container" className="container">
      {conditionRender}
    </div>
  )
};

export default RightContainer;

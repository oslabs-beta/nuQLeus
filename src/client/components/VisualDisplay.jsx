import React, { useContext } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryGroup, VictoryAxis } from 'victory';
import { GraphContext } from '../contexts/GraphContext';

const VisualDisplay = () => {
  const [info, setInfo] = useContext(GraphContext);
  
  const data = [];
  data.push({x: 'Total Query Time', y: info.queryTime.duration});

  info.resolverTime.forEach((ele) => {
    const coordinate = {};
    coordinate.x = ele.parentType + ' : ' + ele.fieldName;
    coordinate.y = ele.average;
    data.push(coordinate);
  })

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [0.5, 5.5], y: [0, info.queryTime.duration] }}
      domainPadding={{ x: 10 }}
      animate={{
        duration: 1000,
        onLoad: { duration: 500 }
      }}
      >
      <VictoryBar horizontal
        style={{
          data: { fill: "#c267f9" }
        }}
        data={data}
      />
    </VictoryChart>
  )


  // y0 = y-axis = 0



}

export default VisualDisplay;

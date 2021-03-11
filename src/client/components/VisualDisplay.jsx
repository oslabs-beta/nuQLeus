import React, { useEffect, useContext } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryGroup, VictoryAxis, VictoryTooltip } from 'victory';
import { GraphContext } from '../contexts/GraphContext';

const VisualDisplay = () => {
  const [info, setInfo] = useContext(GraphContext);
  
  const data = [];
  data.push({x: 'Total Query Time', y: info.queryTime.duration, label: info.queryTime.duration / 1000 + 's'});

  info.resolverTime.forEach((ele) => {
    const coordinate = {};
    coordinate.x = ele.parentType + ' : ' + ele.fieldName;
    coordinate.y = ele.average;
    coordinate.label = ele.average / 1000 + 's';

    data.push(coordinate);
  })

  // Reverse bar chart to show highest values on top 
  data.reverse();
  console.log('data:', data);

  // Write out the axis labels into arrays
  const labels = [];
  const labelLen = [];
  for (let i = 0; i < data.length; ++i) {
    labels.push(data[i].x);
    labelLen.push(i);
  }

  return (
    <VictoryChart
      // theme={VictoryTheme.material}
      domain={{ y: [0, info.queryTime.duration] }}
      domainPadding={{ x: 5, y: 1 }}
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
        x="Duration"
        animate={{
          onExit: {
            duration: 500,
            before: () => ({
              _y: 0,
              label: "BYE"
            })
          }
        }}
        labelComponent={
          <VictoryTooltip
            cornerRadius={20}
            pointerLength={3}
            flyoutStyle={{
              stroke: "black"
            }}
          />
        }
      />
      <VictoryAxis 
        tickValues={labelLen}
        tickFormat={labels}
      />
      <VictoryAxis 
        dependentAxis
        tickFormat={(x => (`${x}ms`))}
      />
    </VictoryChart>
  )


  // y0 = y-axis = 0



}

export default VisualDisplay;

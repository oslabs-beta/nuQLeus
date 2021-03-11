import React, { useEffect, useContext } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryGroup, VictoryAxis, VictoryTooltip } from 'victory';
import { GraphContext } from '../contexts/GraphContext';

const CustomLabel = (props) => {
    const {x, y, orientation} = props;
    //const newY = orientation === "bottom" ? y - 35 : y + 35;
    const newX = x + 35;
    return (
      <g>
        <circle cx={newX} cy={y} r="20" stroke="none" fill="none"/>
      </g>
    );
}

const VisualDisplay = () => {
  const [info, setInfo] = useContext(GraphContext);
  
  const data = [];
  data.push({x: 'Total Query Time', y: info.queryTime.duration, label: info.queryTime.duration + 'ms'});

  info.resolverTime.forEach((ele) => {
    const coordinate = {};
    coordinate.x = ele.parentType + ' : ' + ele.fieldName;
    coordinate.y = ele.average;
    coordinate.label = ele.average + 'ms';

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
    <>
      <h3>Tracing:</h3>
      <VictoryChart
        // theme={VictoryTheme.material}
        domain={{ y: [0, info.queryTime.duration] }}
        domainPadding={{ x: [40, 40] }}
        animate={{
          duration: 1000,
          onLoad: { duration: 500 }
        }}
        padding={{left: 175, right: 40}}
        width={600}
      >
        <VictoryBar horizontal
          style={{
            data: { fill: "#c267f9" }
          }}
          data={data}
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
            // <VictoryTooltip
            //   flyoutComponent={<CustomLabel/>}
            // />
            <VictoryLabel
              dx={40} 
              textAnchor="end"
              theme={VictoryTheme.material}
              style={[
                { fill: 'white', fontSize: 10 }
              ]}
            />
          }
        />
        <VictoryAxis 
          tickValues={labelLen}
          tickFormat={labels}
          style={{
            axis: { stroke: 'white', },
            tickLabels: { fill: 'white', },
            // grid: { stroke: 'white', strokeDasharray: '5' },
          }}
        />
        <VictoryAxis 
          dependentAxis
          tickFormat={(x => (`${x}ms`))}
          style={{
            axis: { stroke: 'white', },
            tickLabels: { fill: 'white', },
            // grid: { stroke: 'white', strokeDasharray: '5' },
          }}
          fixLabelOverlap={true}
        />
      </VictoryChart>
    </>
  )
}

export default VisualDisplay;

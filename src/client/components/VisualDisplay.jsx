import React, { useEffect, useState, useContext } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryGroup, VictoryAxis, VictoryTooltip } from 'victory';
import { GraphContext } from '../contexts/GraphContext';

const VisualDisplay = () => {
  const [info, setInfo] = useContext(GraphContext);
  //console.log('data:', data);
  const [data, setData] = useState(info.graphData);

  // Write out the axis labels into arrays
  const labelsData = [];
  const labelLenData = [];

  for (let i = 0; i < data.length; ++i) {
    labelsData.push(data[i].x);
    labelLenData.push(i);
  }

  const [labels, setLabels] = useState(labelsData);
  const [labelLen, setLabelLen] = useState(labelLenData);

  useEffect(() => {
    setData(info.graphData);
  }, [info.response]);

  useEffect(() => {
    const labels = [];
    const labelLen = [];

    for (let i = 0; i < data.length; ++i) {
      labels.push(data[i].x);
      labelLen.push(i);
    }

    setLabels(labels);
    setLabelLen(labelLen);
  }, [data])

  // Conditiionally adjust height according to number of rows: 

  let height = 300;
  if (labelLen.length > 7) height = 600;

  return (
    <>
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
        height={height}
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
              })
            }
          }}
          labelComponent={
            <VictoryLabel
              dx={30} 
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


  // y0 = y-axis = 0



}

export default VisualDisplay;

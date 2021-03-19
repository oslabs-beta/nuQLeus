import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the GraphQL server/API
  function queryTime(extensions) {
    // Grab variables from nuQLeusTracing field:
    const { startTime, endTime, duration } = extensions.nuQLeusTracing;
    return { startTime, endTime, duration };
  }

  // Resolvers is an array of resolver objects
  function resolverTime(resolvers) {
    const averageResolverResponse = [];
    const cache = {};

    for (let i = 0; i < resolvers.length; i++) {
      const { parentType } = resolvers[i];
      const { fieldName } = resolvers[i];
      const key = `${parentType}-${fieldName}`;
      if (!cache[key]) cache[key] = [];
      cache[key].push(resolvers[i].duration);
    }

    for (const key in cache) {
      const keys = key.split('-');
      const obj = {
        parentType: keys[0],
        fieldName: keys[1],
        durations: cache[key],
        average: Math.round((cache[key].reduce((a, b) => a + b) / cache[key].length) * 100) / 100,
      };
      averageResolverResponse.push(obj);
    }

    return averageResolverResponse;
  }

  function updateGraphData(queryTime, resolverTime) {
    const data = [];

    data.push({x: 'Total Query Time', y: queryTime.duration, label: queryTime.duration + 'ms'});

    resolverTime.forEach((ele) => {
      const coordinate = {};
      coordinate.x = ele.parentType + ' : ' + ele.fieldName;
      coordinate.y = ele.average;
      coordinate.label = ele.average + 'ms';

      data.push(coordinate);
    })

    // Reverse bar chart to show highest values on top 
    data.reverse();
    return data;
  }

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields; determine request 'type'
    const userURI = document.getElementById('input-link').value;
    let userVariables;
    if (info.variables === '') userVariables = {};
    else userVariables = JSON.parse(info.variables);

    // Function to send the user's query to the GraphQL server/API
    const handleRequest = () => {
      fetch(`${userURI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${info.body}`,
          variables: userVariables,
        }),
      })
        // .then((res) => {
        //   if (!res.ok) {
        //     throw Error(res.statusText);
        //   }
        //   return res;
        // })
        .then((res) => res.json())
        .then((res) => {
          const extensionsExist = res.extensions ? true : false;

          if (extensionsExist && res.extensions.nuQLeusTracing) {

            const queryTimeData = queryTime(res.extensions);
            const resolverTimeData = resolverTime(res.extensions.nuQLeusTracing.resolvers);
            const graphData = updateGraphData(queryTimeData, resolverTimeData);
      
            setInfo(() => ({
              ...info,
              response: res.data,
              extensions: res.extensions,
              queryTime: queryTimeData,
              resolverTime: resolverTimeData,
              graphData
            }));
          } else {
            setInfo(() => ({
              ...info,
              response: res.data ? res.data: res,
              extensions: null
            }));
          }
        })
        .catch((err) => {
          setInfo(() => ({
            ...info,
            response: 'Request to server failed.',
          }));
        })
    };

    // Function to handle invalid user input
    const handleInvalid = () => {
      setInfo(() => ({
        ...info,
        response: 'Invalid Syntax',
      }));
    };

    // Validate Input
    if (
      info.body.substring(0, 5).toLowerCase() === 'query'
      || info.body.substring(0, 5).toLowerCase() === 'mutat'
      || info.body[0] === '{'
    ) {
      handleRequest();
    } else handleInvalid();
  }
  return (
    <div className="server-field">
        <div className="server-title"><h4 className="query-title">Server:</h4></div>
        <div className="server-input"><input id="input-link" className="input" type="text" defaultValue={info.uri} /></div>
        <div className="server-btn"><button id="submit-query" className="btn-gray" type="submit" onClick={handleClick}>
          Send
        </button></div>
    </div>
  );
};

export default ServerField;

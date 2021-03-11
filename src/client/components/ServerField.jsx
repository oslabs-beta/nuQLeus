import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import fetch from 'fetch';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  function queryTime(extensions) {
    // Grab variables from nuQLeusTracing field:
    const { startTime, endTime, duration } = extensions.nuQLeusTracing
    const queryResponseTime = duration;
    return { startTime, endTime, duration };
  }
  
  // Resolvers is an array of resolver objects
  function resolverTime(resolvers) {
    const averageResolverResponse = []
    const cache = {}
  
    for (let i = 0; i < resolvers.length; i++) {
      const parentType = resolvers[i].parentType;
      const fieldName = resolvers[i].fieldName;
      const key = parentType + '-' + fieldName;
      if (!cache[key]) cache[key] = [];
      cache[key].push(resolvers[i].duration);
    }
  
    for (let key in cache) {
      const keys = key.split('-');
      const obj = {
        parentType: keys[0],
        fieldName: keys[1],
        durations: cache[key],
        average: cache[key].reduce((a, b) => a + b) / cache[key].length
      }
      averageResolverResponse.push(obj);
    }
  
    return averageResolverResponse;
  }

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields; determine request 'type'
    const userURI = document.getElementById('server-input').value;
    const reqType = info.body.substr(0, info.body.indexOf(' ')).toLowerCase();

    // Function to send the user's mutation to the Apollo Server
    const handleMutation = () => {
      fetch(`${userURI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${info.body}`,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
            extensions: res.extensions,
          }));
        })
      .catch((err) => {
        setInfo(() => ({
          ...info,
          response: err,
        }));
      });
    };

    // Function to send the user's query to the Apollo Server
    const handleQuery = () => {
      fetch(`${userURI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${info.body}`,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
            extensions: res.extensions,
            queryTime: queryTime(res.extensions),
            resolverTime: resolverTime(res.extensions.nuQLeusTracing.resolvers),
          }));
        })
        .catch((err) => {
          setInfo(() => ({
            ...info,
            response: err,
          }));
        });
    };

    // Function to handle invalid user input
    const handleInvalid = () => {
      setInfo(() => ({
        ...info,
        response: 'Invalid Syntax',
      }));
    };

    // Determine if body input is a 'query' or 'mutation'
    if (reqType === 'query') handleQuery();
    else if (reqType === 'mutation') handleMutation();
    else handleInvalid();
  }

  return (
    <div className="server-field">
      <form>
        <label>
          <h3 className="query-title">Query:</h3>
          <input id="server-input" className="input" type="text" defaultValue={info.uri} />
        </label>
        <button id="submit-query" className="btn-gray" type="submit" onClick={handleClick}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ServerField;

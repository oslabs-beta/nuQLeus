import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the GraphQL server/API
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields; determine request 'type'
    const userURI = document.getElementById('server-input').value;
    const userVariables = JSON.parse(info.variables);

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
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
        })
        .then((res) => res.json())
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
            extensions: res.extensions,
          }));
        })
        .catch((error) => {
          setInfo(() => ({
            ...info,
            response: 'Request to API Unsuccessful.',
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

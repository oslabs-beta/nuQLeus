import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import fetch from 'fetch';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields; determine request 'type'
    const userURI = document.getElementById('server-input').value;
    // const userBody = document.getElementById('query-input').value;
    const userVariables = JSON.parse(info.variables);
    console.log(info.body);
    const reqType = info.body.substr(0, info.body.indexOf(' ')).toLowerCase();
    console.log(userVariables);

    if (userVariables) {
      const bodyArr = info.body.split(' ');
      console.log(bodyArr);
      // loop through array, if element === $+element, lookup element in userVariables and swap it for the current element
      bodyArr.forEach((ele) => {
        if (ele === `$${ele}`) {
          ele = userVariables[ele.slice(1)];
        }
      });
    }

    console.log(bodyArr);

    // Instantiate a new Apollo Client corresponding to the Apollo Server located @ uri
    // const client = new ApolloClient({
    //   uri: userURI,
    //   cache: new InMemoryCache(),
    // });

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

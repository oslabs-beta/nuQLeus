import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields
    const userURI = document.getElementById('server-input').value;
    const userBody = document.getElementById('query-input').value;
    const userVariables = document.getElementById('variable-input').value;
    const type = userBody.substr(0, userBody.indexOf(' ')).toLowerCase();
    console.log(type);

    // Instantiate a new Apollo Client corresponding to the Apollo Server located @ uri
    const client = new ApolloClient({
      uri: userURI,
      cache: new InMemoryCache(),
    });

    // Function to send the user's mutation to the Apollo Server
    const handleMutation = () => {
      client
        .mutate({
          mutation: gql`
            ${userBody}
          `,
        })
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
          }));
        })
        .catch(() => {
          setInfo(() => ({
            ...info,
            response: 'Query failed.',
          }));
        });
    };

    // Function to send the user's query to the Apollo Server
    const handleQuery = () => {
      client
        .query({
          query: gql`
            ${userBody}
          `,
        })
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
          }));
        })
        .catch(() => {
          setInfo(() => ({
            ...info,
            response: 'Query failed.',
          }));
        });
    };

    // Function to handle invalid user input
    const handleInvalid = () => {
      // setInputs(prevInputs => Object.assign(prevInputs, {response: res.data.rates}));
      setInfo(() => ({
        ...info,
        response: 'Invalid Syntax',
      }));
    };

    // Determine if body input is a 'query' or 'mutation'
    if (type === 'query') handleQuery();
    if (type === 'mutation') handleMutation();
    else handleInvalid();
  }
  return (
    <div>
      <form>
        <label>
          Server:
          <input id="server-input" className="input" type="text" defaultValue={info.uri} />
        </label>
        <button id="submit-query" type="submit" onClick={handleClick}>
          Link
        </button>
      </form>
    </div>
  );
};

export default ServerField;

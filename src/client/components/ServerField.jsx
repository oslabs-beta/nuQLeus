import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields; determine request 'type'
    const userURI = document.getElementById('server-input').value;
    //const userBody = document.getElementById('query-input').value;
    //const userVariables = document.getElementById('variable-input').value;
    const reqType = userBody.substr(0, userBody.indexOf(' ')).toLowerCase();

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
        .catch((err) => {
          setInfo(() => ({
            ...info,
            response: err,
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
          Query: 
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

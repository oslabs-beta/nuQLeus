import React, { useContext, useState, MouseEvent } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  // const value = useContext(GraphContext);
  const { info, setInfo } = useContext(GraphContext);
  // const [inputs, setInputs] = useState(value);

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields
    const userURI = document.getElementById('server-input').value;
    const userBody = document.getElementById('query-input').value;
    const userVariables = document.getElementById('variable-input').value;

    // Instantiate a new Apollo Client corresponding to the Apollo Server located @ uri
    const client = new ApolloClient({
      uri: userURI,
      cache: new InMemoryCache(),
    });

    // Format and send the user's query to the Apollo Server
    client
      .query({
        query: gql`
          ${userBody}
        `,
      })
      .then((res) => {
        // setInputs(prevInputs => Object.assign(prevInputs, {response: res.data.rates}));
        setInfo(() => ({
          ...info, 
          response: res.data.rates
        }));
      })
      .catch((err) => console.log('Invalid URL'));
  }

  return (
    <div>
      <form>
        <label>
          Server:
          <input id="server-input" className="input" type="text" defaultValue={info.uri} />
        </label>
        <button id="submit-query" type="submit" onClick={((e) => handleClick(e))}>
          Link
        </button>
      </form>
    </div>
  );
};

export default ServerField;

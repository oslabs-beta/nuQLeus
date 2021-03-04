import React, { useContext, useState, MouseEvent } from 'react';
import { GraphContext } from '../contexts/GraphContext';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

export const ServerField = () => {
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields
    const userURI = document.getElementById('server-input').value;
    const userBody = document.getElementById('query-input').value;
    const userVariables = document.getElementById('variable-input').value;
  
    // Instantiate a new Apollo Client corresponding to the Apollo Server located @ uri
    const client = new ApolloClient({
      uri: userURI,
      cache: new InMemoryCache()
    });
    
    // Format and send the user's query to the Apollo Server 
    client  
      .query({
        query: gql`${userBody}`
      })
      .then(result => console.log(result))
      .catch((err) => console.log('Invalid URL'))
  };

  // Pull state into component from ApolloContext using 'useContext' hook
  const value = useContext(GraphContext);

  return (
    <div>
      <form>
        <label>
          Server: 
          <input id="server-input" className="input" type="text" defaultValue={ value.uri } />
        </label>
        <button id="submit-server" onClick={ (e) => handleClick(e) }>
          Link
        </button>
      </form>
    </div>
  )
};

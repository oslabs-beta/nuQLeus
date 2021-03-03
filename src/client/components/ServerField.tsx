import React, { MouseEvent } from 'react';

export interface ServerFieldProps {
  text?: string;
};

export const ServerField: React.FC<ServerFieldProps> = () => {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // grab the input value from the form input and connect to the client's host server (?)
    console.log('Doing something for now');
  }

  return (
    <div>
      <form>
        <label>
          Server: 
          <input id="server-input" className="input" type="text" />
        </label>
        <button id="submit-server" onClick={handleClick}>
          Link
        </button>
      </form>
    </div>
  )
};

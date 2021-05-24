import React, {createContext, useEffect, useState} from 'react';

import axios from 'axios';

export const Context = createContext();

export function MyContext(props) {
const [Test, setTest] = useState("Test")
  return (
    <Context.Provider
      value={{
        Test
      }}>
      {props.children}
    </Context.Provider>
  );
}

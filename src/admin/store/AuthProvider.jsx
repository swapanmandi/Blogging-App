import React, { useState } from "react";
import { createContext } from "react";

export const authContext = createContext();

function AuthProvider({ children }) {
  //const [loading, setLoading] = useState(true);


  return (
    <>
      <authContext.Provider
        value={""}
      >
        {children}
      </authContext.Provider>
     
    </>
  );
}

export { AuthProvider };

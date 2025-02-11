import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext();
export default function AuthenticationProvider({ children }) {
  const [token, settoken] = useState(null);
  const [usrrTokenData, setusrrTokenData] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn != null) {
      settoken(tkn);
    }
  }, []);
  function tokenDecrypt() {
    const decoded = jwtDecode(token);

    console.log("token", decoded);
    setusrrTokenData(decoded);
  }

  useEffect(() => {
    if (token) {
      tokenDecrypt();
    }
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{
        token,
        settoken,
        tokenDecrypt,
        usrrTokenData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

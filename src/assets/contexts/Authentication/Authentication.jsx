import React, { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();
export default function AuthenticationProvider({ children }) {
  const [token, settoken] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn != null) {
      settoken(tkn);
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        token,
        settoken,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

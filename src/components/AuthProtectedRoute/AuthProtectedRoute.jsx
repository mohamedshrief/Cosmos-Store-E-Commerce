import React, { useContext } from "react";
import { AuthenticationContext } from "../../assets/contexts/Authentication/Authentication";
import NotFound404 from "../NotFound404/NotFound404";

export default function AuthProtectedRoute({ children }) {
  const { token } = useContext(AuthenticationContext);
  if (token) {
    return <NotFound404 />;
  } else {
    return <>{children}</>;
  }
}

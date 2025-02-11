import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../assets/contexts/Authentication/Authentication";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthenticationContext);
  if (token) {
    return <>{children}</>;
  } else {
    navigate("/login");
  }
}

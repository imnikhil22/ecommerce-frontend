import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginStatus } from "../store/loginState";

export const RequireAuth = ({ children }) => {
  const [loginStatus, setLoginStatus] = useLoginStatus();
  const location = useLocation();

  if (!loginStatus.isLogged) {
    return <Navigate to="/dummy" />;
  }
  return children;
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "../store/loginState";

export const Dummy = () => {
  const navigate = useNavigate();
  const [loginStatus] = useLoginStatus();
  if (loginStatus.isLogged) {
    navigate("/");
  }
  return (
    <>
      <h2>Login to continue</h2>
    </>
  );
};

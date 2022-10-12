import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useLoginStatus } from "../store/loginState";

export const Logout = () => {
  const [loginStatus, setLoginStatus] = useLoginStatus();

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        // Sign-out successful.
        console.log(result);
        localStorage.removeItem("google-oauth-token");
        setLoginStatus((prevLoginStatus) => ({
          token: null,
          isLogged: false,
        }));
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return <button onClick={logoutHandler}>Logout</button>;
};

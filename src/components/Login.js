import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginStatus } from "../store/loginState";

export function Login() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useLoginStatus();
  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    // signInWithRedirect(auth, provider);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(result);
        const googleToken = credential.accessToken;
        console.log(googleToken);
        const accessToken = result.user.accessToken;
        console.log(credential);
        localStorage.setItem("google-oauth-token", accessToken);
        localStorage.setItem("google-api-token", googleToken);
        setLoginStatus((prevLoginStatus) => ({
          accessToken,
          isLogged: true,
        }));
        // The signed-in user info.
        const user = result.user;

        navigate("/", { replace: true });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return <button onClick={googleLogin}>Login</button>;
}

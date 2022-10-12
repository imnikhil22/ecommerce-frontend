import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Product } from "./pages/Product";
import { Dummy } from "./components/Dummy";
import { useLoginStatus } from "./store/loginState";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { RequireAuth } from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => {
  const [loginStatus, setLoginStatus] = useLoginStatus();

  useEffect(() => {
    var id_token = localStorage.getItem("google-api-token");
    if (id_token) {
      console.log(id_token);
      const credential = GoogleAuthProvider.credential(null, id_token);
      console.log(credential);
      const auth = getAuth();
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log(result);
          setLoginStatus((prevLoginStatus) => ({
            token: id_token,
            isLogged: true,
          }));
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          console.log(email);
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  }, [setLoginStatus]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;

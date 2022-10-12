import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRpSoY0hxfy7i3e0yrAaxzn1BMM_EUS5E",
  authDomain: "ecommerce-auth-9c241.firebaseapp.com",
  projectId: "ecommerce-auth-9c241",
  storageBucket: "ecommerce-auth-9c241.appspot.com",
  messagingSenderId: "430840620405",
  appId: "1:430840620405:web:c028cac62c8f0c7ee09f3c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

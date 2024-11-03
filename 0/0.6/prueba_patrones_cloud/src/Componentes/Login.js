import React from 'react';
import { auth, provider, signInWithPopup } from '../firebaseConfig';

const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User logged in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
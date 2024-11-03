import React from 'react';
import { auth, signOut } from '../firebaseConfig';

const Logout = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Logout;
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Login from './Componentes/Login';
import Logout from './Componentes/Logout';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Demo Federated identity</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
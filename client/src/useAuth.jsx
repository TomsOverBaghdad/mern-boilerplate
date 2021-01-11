import React, { useState, useContext, createContext } from "react";
import axios from 'axios';
import { useAsync, useAsyncCallback } from 'react-async-hook';

import { AuthRoutes } from './routes';

const AuthContext = createContext();

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const testUser = { email: "tdror53@gmail.com", firstName: "Tom", lastName: "Dror" }

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any methods we want to use making sure to save the user to state.
  const signIn = useAsyncCallback(({email, password}) =>
    axios.post(AuthRoutes.signIn(), {email, password})
      .then((userRes) => {
        setUser(userRes);
      })
  );

  const signOut = useAsyncCallback(() =>
    axios.post(AuthRoutes.signOut())
      .then(() => setUser(false))
  );

  const register = useAsyncCallback((signUpForm) =>
    axios.post(AuthRoutes.register(), signUpForm)
      .then((userRes) => setUser(userRes))
  );

  const authenticate = useAsync(() => setUser(testUser)
    // axios.get(AuthRoutes.authenticate())
    //   .then((userRes) => {
    //     console.log('current user', {user: userRes})
    //     userRes ?
    //       setUser(userRes) :
    //       setUser(false);
    //   })
    //   .catch((err) => {
    //     // todo handle errors here, like the server is down or other issues
    //     console.error(err);
    //     setUser(false);
    //   })
    , []
  );

  // Return the user object and auth methods
  return {
    user,
    signIn,
    signOut,
    register,
    authenticate,
    setUser,
  };
}

import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

  const [userState, setUserState] = useState(sessionStorage.getItem('logged_in') || null);;

  const setUser = user => {
    sessionStorage.setItem('logged_in', true);
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ userState, setUser }}>
        {children}
    </UserContext.Provider>
  );
};

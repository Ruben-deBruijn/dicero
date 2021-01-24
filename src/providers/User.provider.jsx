import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(JSON.parse(sessionStorage.getItem('user')) || null);;

  const setUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ userState, setUser }}>
        {children}
    </UserContext.Provider>
  );
};

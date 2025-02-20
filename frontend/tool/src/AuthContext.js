import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
        const [auth, setAuth] = useState(null);

        useEffect(() =>{
        const token = localStorage.getItem('Token');
        console.log('Retrieved token', token);
        setAuth({token});
        },[]); 

      const login = (token) => {
        localStorage.setItem('Token', token);
        setAuth({token});
      };

      const logout = () => {
        localStorage.removeItem('Token');
        setAuth(null);
      }

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider};
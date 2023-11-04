import React, { useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import jwtDecode from 'jwt-decode';

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenPayload, setTokenPayload] = useState({});
  
    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        setIsAuthenticated(true);
        decodeToken(token);
      } else {
        setIsAuthenticated(false);
      }
    
    }, [isAuthenticated]);

    const decodeToken = (token) => {
        
      setTokenPayload(jwtDecode(token))
    }
  
    const login = (token) => {
      localStorage.setItem('jwtToken', token);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      localStorage.removeItem('jwtToken');
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, tokenPayload }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
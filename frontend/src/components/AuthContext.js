import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  };

  // Login function that your LoginPage expects
  const login = async (userData) => {
    try {
      const { token: userToken, user: userInfo } = userData;
      
      // Validate required data
      if (!userToken || !userInfo) {
        throw new Error('Invalid login data provided');
      }

      // Update state
      setToken(userToken);
      setUser(userInfo);
      setIsAuthenticated(true);
      
      console.log('Login successful, user data saved');
      return Promise.resolve();
    } catch (error) {
      console.error('Error in login function:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint if you have one
      await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error calling logout endpoint:', error);
    } finally {
      // Clear state regardless of API call result
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
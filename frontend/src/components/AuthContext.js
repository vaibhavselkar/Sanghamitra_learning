import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const checkAuth = async () => {
    try {
      const response = await fetch('https://3.111.49.131:4000/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Auth check response:', data); // Debug log
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          if (data.user) {
            setUser(data.user);
            setToken(data.token || null);
          } else {
            // Handle case where user data isn't provided
            console.warn('User authenticated but no user data provided');
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
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
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const { token: userToken, user: userInfo } = userData;
      
      if (!userToken || !userInfo) {
        throw new Error('Invalid login data provided');
      }

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

  const logout = async () => {
    try {
      await fetch('https://3.111.49.131:4000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error calling logout endpoint:', error);
    } finally {
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
    isLoading,
    login,
    logout,
    checkAuth
  };

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

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

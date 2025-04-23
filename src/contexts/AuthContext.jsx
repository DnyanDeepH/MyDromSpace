import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '../components/ui/sonner';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'student' or 'owner'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dormspaceUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setUserType(parsedUser.type);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('dormspaceUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function - simulates authentication
  const login = (email, password, type = 'student') => {
    // Simulate API call
    setTimeout(() => {
      // Create dummy user data
      const dummyUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        type,
        createdAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('dormspaceUser', JSON.stringify(dummyUser));
      
      // Update state
      setUser(dummyUser);
      setIsAuthenticated(true);
      setUserType(type);

      toast.success('Login successful!');
    }, 500);
  };

  // Register function - simulates user registration
  const register = (name, email, password, type = 'student') => {
    // Simulate API call
    setTimeout(() => {
      // Create dummy user data
      const dummyUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        type,
        createdAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('dormspaceUser', JSON.stringify(dummyUser));
      
      // Update state
      setUser(dummyUser);
      setIsAuthenticated(true);
      setUserType(type);

      toast.success('Registration successful!');
    }, 500);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('dormspaceUser');
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    toast.success('Logged out successfully!');
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    userType,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

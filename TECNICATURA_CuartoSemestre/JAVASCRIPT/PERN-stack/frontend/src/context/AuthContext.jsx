import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Register user
  const signup = async (user) => {
    try {
      const res = await axios.post('http://localhost:3001/api/signup', user, {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  // Login user
  const signin = async (user) => {
    try {
      const res = await axios.post('http://localhost:3001/api/signin', user, {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, {
        withCredentials: true,
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = async () => {
    const res = await axios.post("/signout");
    setUser(null);
    setIsAuthenticated(false);
    return res.data;
  };
  // Clear errors
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Check if user is logged in on mount
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await axios.get('http://localhost:3001/api/profile', {
          withCredentials: true,
        });
        if (res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        signout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
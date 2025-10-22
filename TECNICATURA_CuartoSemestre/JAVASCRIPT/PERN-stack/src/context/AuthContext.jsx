import { createContext, useState, useContext } from "react";
import axios from 'axios'; // ← FALTABA ESTE IMPORT

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider ({children}) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);

  const signup = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", data, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      setErrors(error.response?.data || "Error en el registro");
      console.error(error);
    }
  }

  return <AuthContext.Provider value={{
    user,
    setUser,
    isAuth,
    setIsAuth,
    errors,
    setErrors,
    signup 
  }}>
    {children}
  </AuthContext.Provider>
}
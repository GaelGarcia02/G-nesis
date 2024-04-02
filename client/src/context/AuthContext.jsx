import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";
import { decodeToken } from "./jwtUtils";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    setIsAuthenticated(false);
    try {
      const res = await loginRequest(user);
      console.log(res.data);

      // Decodificar el token para obtener el tipo de usuario
      const userType = decodeToken(res.data.token);

      // Actualizar el estado del usuario, la autenticación y el tipo de usuario
      setUser(res.data);
      setUserType(userType);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const userType = decodeToken(token);
      setUserType(userType);
      verifyToken(token);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await verifyTokenRequest(token);
      if (res.data) {
        setUser({ ...res.data, userType });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }

          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
        userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

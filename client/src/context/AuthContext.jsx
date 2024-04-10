import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

  const decodeToken = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const userType = decoded.typeUser;
      return userType;
    }
    return null;
  };

  const signin = async (user) => {
    setIsAuthenticated(false);
    try {
      const res = await loginRequest(user);
      const decodedUserType = decodeToken(res.data.token);
      setUser(res.data);
      setUserType(decodedUserType);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    try {
      await logoutRequest();
      Cookies.remove("token");
      setUser(null);
      setUserType(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors(["Error al cerrar sesión"]);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const isPasswordChangeRequired = () => {
    return user?.passwordChange === false;
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      setUserType(null);
      return;
    }

    try {
      const userType = decodeToken(token);
      setUserType(userType);
      verifyToken(token);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUserType(null);
    }
  }, [isAuthenticated]);

  const verifyToken = async (token) => {
    try {
      const userType = decodeToken(token);
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

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        isPasswordChangeRequired,
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

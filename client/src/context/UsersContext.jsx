import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,
  getUserRequest,
  updateUserRequest,
  verifyPasswordRequest,
} from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userAdd, setUserAdd] = useState(false);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await updateUserRequest(id, userData);
      setUserAdd(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPassword = async (userId, password) => {
    try {
      const res = await verifyPasswordRequest(userId, password);
      return res.data.isPasswordCorrect;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        getUser,
        updateUser,
        verifyPassword,
        users,
        errors,
        userAdd,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

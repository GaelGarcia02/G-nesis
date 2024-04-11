import { createContext, useContext, useState, useEffect } from "react";
import {
  getUsersRequest,
  getUserRequest,
  updateUserRequest,
  createUserRequest,
  deleteUsersRequest,
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
  const [isVerified, setIsVerified] = useState(false); // Nuevo estado

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

  const createUser = async (userData) => {
    try {
      const res = await createUserRequest(userData);
      // Agregar el nuevo usuario a la lista existente
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setUserAdd(true);
      setErrors([]);
    } catch (error) {
      console.log(error.response);
      setErrors(
        Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data]
      );
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUsersRequest(id);
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      }
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
        createUser,
        deleteUser,
        verifyPassword,
        setErrors,
        users,
        errors,
        userAdd,
        isVerified,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserRequest,
  getUsersRequest,
  deleteUsersRequest,
  getUserRequest,
  updateUsersRequest,
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
  const [user, setUser] = useState([]);
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

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
      console.log(res.data);
      // Agregar el nuevo usuario a la lista existente
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setUserAdd(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUsersRequest(id);
      if (res.status === 200) setUsers(users.filter((user) => user._id !== id));
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

  const updateUser = async (id, user) => {
    try {
      await updateUsersRequest(id, user);
      setUserAdd(true);
    } catch (error) {
      console.log(error);
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
    <UserContext.Provider
      value={{
        createUser,
        getUsers,
        getUser,
        deleteUser,
        getUser,
        updateUser,
        users,
        user,
        errors,
        userAdd,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

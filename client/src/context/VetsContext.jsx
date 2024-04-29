import { createContext, useContext, useState, useEffect } from "react";
import {
  createVetRequest,
  getVetRequest,
  deleteVetsRequest,
  getVetsRequest,
  updateVetsRequest,
} from "../api/vets";

const VetContext = createContext();

export const useVets = () => {
  const context = useContext(VetContext);
  if (!context) {
    throw new Error("useVets must be used within a VetProvider");
  }
  return context;
};

export function VetProvider({ children }) {
  const [vets, setVets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [vetAdd, setVetAdd] = useState(false);

  const getVets = async () => {
    try {
      const res = await getVetsRequest();
      setVets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createVet = async (vet) => {
    try {
      const res = await createVetRequest(vet);
      console.log(res.data);
      setVets((prevVets) => [...prevVets, res.data]);
      setVetAdd(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteVet = async (id) => {
    try {
      const res = await deleteVetsRequest(id);
      if (res.status === 200) setVets(vets.filter((vet) => vet._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getVet = async (id) => {
    try {
      const res = await getVetRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateVet = async (id, vet) => {
    try {
      await updateVetsRequest(id, vet);
      setVetAdd(true);
    } catch (error) {
      {
        console.log(error);
      }
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
    <VetContext.Provider
      value={{
        createVet,
        getVets,
        deleteVet,
        getVet,
        updateVet,
        vets,
        errors,
        vetAdd,
      }}
    >
      {children}
    </VetContext.Provider>
  );
}

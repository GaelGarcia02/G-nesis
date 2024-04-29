import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createHorseRequest,
  getHorsesRequest,
  deleteHorsesRequest,
  getHorseRequest,
  updateHorsesRequest,
  getSensorsRequest,
  getParamsRequest,
} from "../api/horses";

const HorseContext = createContext();

export const useHorses = () => {
  const context = useContext(HorseContext);
  if (!context) {
    throw new Error("useHorses must be used within a HorseProvider");
  }
  return context;
};

export function HorseProvider({ children }) {
  const [horses, setHorses] = useState([]);
  const [errors, setErrors] = useState([]);
  const [horseAdd, setHorseAdd] = useState(false);
  const [sensors, setSensors] = useState([]);

  const getHorses = async () => {
    try {
      const res = await getHorsesRequest();
      setHorses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { isAuthenticated } = useAuth();

  const createHorse = async (horse) => {
    try {
      const res = await createHorseRequest(horse);
      console.log(res.data);
      setHorses((prevHorses) => [...prevHorses, res.data]);
      setHorseAdd(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const deleteHorse = async (id) => {
    try {
      const res = await deleteHorsesRequest(id);
      if (res.status === 200)
        setHorses(horses.filter((horse) => horse._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getHorse = async (id) => {
    try {
      const res = await getHorseRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateHorse = async (id, horse) => {
    try {
      await updateHorsesRequest(id, horse);
      setHorseAdd(true);
    } catch (error) {
      {
        console.log(error);
      }
    }
  };

  const getAvailableSensors = async () => {
    try {
      const res = await getSensorsRequest();
      setSensors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getParams = async (idSensor) => {
    try {
      const res = await getParamsRequest(idSensor);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAvailableSensors();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <HorseContext.Provider
      value={{
        createHorse,
        getHorses,
        deleteHorse,
        getHorse,
        updateHorse,
        horses,
        errors,
        horseAdd,
        sensors,
        getParams,
      }}
    >
      {children}
    </HorseContext.Provider>
  );
}

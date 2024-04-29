import axios from "./axios";

export const getHorsesRequest = () => axios.get("/horses");

export const getHorseRequest = (id) => axios.get(`/horses/${id}`);

export const createHorseRequest = (horse) => axios.post("/horses", horse);

export const updateHorsesRequest = (id, horse) =>
  axios.put(`/horses/${id}`, horse);

export const deleteHorsesRequest = (id) => axios.delete(`/horses/${id}`);

export const getSensorsRequest = () => axios.get("/sensors");

export const getParamsRequest = (idSensor) => axios.get(`/sensors/${idSensor}`);

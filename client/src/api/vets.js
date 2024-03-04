import axios from "./axios";

export const getVetsRequest = () => axios.get("/vets");

export const getVetRequest = (id) => axios.get(`/vets/${id}`);

export const createVetRequest = (vet) => axios.post("/vets", vet);

export const updateVetsRequest = (id, vet) => axios.put(`/vets/${id}`, vet);

export const deleteVetsRequest = (id) => axios.delete(`/vets/${id}`);

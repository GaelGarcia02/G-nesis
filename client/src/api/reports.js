import axios from "./axios";

export const getReportsRequest = () => axios.get("/reports");

export const getReportRequest = (id) => axios.get(`/reports/${id}`);

export const createReportRequest = (report) => axios.post("/reports", report);

export const updateReportsRequest = (id, report) =>
  axios.put(`/reports/${id}`, report);

export const deleteReportsRequest = (id) => axios.delete(`/reports/${id}`);

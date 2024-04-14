import { createContext, useContext, useState, useEffect } from "react";
import {
  createReportRequest,
  getReportsRequest,
  deleteReportsRequest,
  getReportRequest,
  updateReportsRequest,
} from "../api/reports";

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useHorses must be used within a HorseProvider");
  }
  return context;
};

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [errors, setErrors] = useState([]);
  const [reportsAdd, setReportsAdd] = useState(false);

  const getReports = async () => {
    try {
      const res = await getReportsRequest();
      setReports(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createReport = async (report) => {
    try {
      const res = await createReportRequest(report);
      console.log(res.data);
      setReports((prevReports) => [...prevReports, res.data]);
      setReportsAdd(true);
    } catch (error) {
      console.log(error.response);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteReport = async (id) => {
    try {
      const res = await deleteReportsRequest(id);
      if (res.status === 200)
        setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getReport = async (id) => {
    try {
      const res = await getReportRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateReport = async (id, report) => {
    try {
      await updateReportsRequest(id, report);
      setReportsAdd(true);
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
    <ReportsContext.Provider
      value={{
        createReport,
        getReports,
        deleteReport,
        getReport,
        updateReport,
        reports,
        errors,
        reportsAdd,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

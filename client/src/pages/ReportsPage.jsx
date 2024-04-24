import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReports } from "../context/ReportsContext.jsx";
import { useAuth } from "../context/AuthContext";
import { handleDelete } from "../utils/sweetAlerts.js";
import { BsSearch } from "react-icons/bs";

function ReportsPage() {
  const { getReports, deleteReport, reports } = useReports();
  const { isAuthenticated, userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    getReports();
  }, []);

  const filteredReports = reports.filter((report) =>
    report.namehorse.includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const renderSortOption = () => {
    switch (sortType) {
      case "nameAsc":
        return "Nombre (A-Z)";
      case "nameDesc":
        return "Nombre (Z-A)";
      case "hoursAsc":
        return "Horas Trabajadas (Menor a Mayor)";
      case "hoursDesc":
        return "Horas Trabajadas (Mayor a Menor)";
      case "dateAsc":
        return "Fecha de Creación (Antigua a Reciente)";
      case "dateDesc":
        return "Fecha de Creación (Reciente a Antigua)";
      default:
        return "Ninguno";
    }
  };

  // Función para ordenar los reportes
  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortType) {
      case "nameAsc":
        return a.namehorse.localeCompare(b.namehorse);
      case "nameDesc":
        return b.namehorse.localeCompare(a.namehorse);
      case "hoursAsc":
        return a.job - b.job;
      case "hoursDesc":
        return b.job - a.job;
      case "dateAsc":
        return new Date(a.updateDate) - new Date(b.updateDate);
      case "dateDesc":
        return new Date(b.updateDate) - new Date(a.updateDate);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reportes</h1>
      <div className="flex justify-center">
        {isAuthenticated &&
          (userType === "manager" || userType === "superadmin") && (
            <Link
              to="/reports/add"
              className="my-4 w-max bg-[#448dc9] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#2a567a] text-white text-center"
            >
              Agregar
            </Link>
          )}
      </div>
      <div className="flex md:flex-row flex-col justify-between gap-6 items-center">
        <div className="flex items-center">
          <p className="mr-2">Ordenar por:</p>
          <select
            value={sortType}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="">Ninguno</option>
            <option value="nameAsc">Nombre (A-Z)</option>
            <option value="nameDesc">Nombre (Z-A)</option>
            <option value="hoursAsc">Horas Trabajadas (Menor a Mayor)</option>
            <option value="hoursDesc">Horas Trabajadas (Mayor a Menor)</option>
            <option value="dateAsc">
              Fecha de Creación (Antigua a Reciente)
            </option>
            <option value="dateDesc">
              Fecha de Creación (Reciente a Antigua)
            </option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full"
          />
          <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Medicamentos</th>
              <th className="border border-gray-300 px-4 py-2">
                Especificaciones
              </th>
              <th className="border border-gray-300 px-4 py-2">Alimento</th>
              <th className="border border-gray-300 px-4 py-2">Herraje</th>
              <th className="border border-gray-300 px-4 py-2">
                Horas Trabajadas
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Fecha de Creación
              </th>
              {isAuthenticated && userType === "manager" && (
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report, index) => (
              <tr key={report._id || index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {report.namehorse}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.medicines}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.specifications}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.food}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.horseshoes}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {report.job} Horas
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(report.updateDate).toLocaleDateString("es-MX")}
                </td>
                {isAuthenticated &&
                  (userType === "manager" || userType === "superadmin") && (
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center gap-10">
                        <Link
                          to={`/reports/${report._id}`}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(report._id, deleteReport, "reporte")
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsPage;

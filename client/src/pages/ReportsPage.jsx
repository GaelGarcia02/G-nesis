import React, { useEffect } from "react";
import { useReports } from "../context/ReportsContext.jsx";

function ReportsPage() {
  const { getReports, reports } = useReports();

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Reportes</h1>
      <div>
        {reports.length === 0 ? (
          <div>
            <h1>No hay ningún reporte</h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Medicamentos
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Especificaciones
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Alimento</th>
                  <th className="border border-gray-300 px-4 py-2">Herraje</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Trabajo Realizado <br />
                    (En horas)
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {report.name}
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
                    <td className="border border-gray-300 px-4 py-2">
                      {report.job} Horas
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;

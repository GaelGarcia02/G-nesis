import React, { useEffect } from "react";
import { useVets } from "../context/VetsContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { handleDelete } from "../utils/sweetAlerts.js";

function VetsPage() {
  const { getVets, vets, deleteVet } = useVets();
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    getVets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Veterinarios</h1>
      <div className="flex justify-center">
        {isAuthenticated && userType !== "common" && (
          <Link
            to="/vets/add"
            className="my-4 w-max bg-[#448dc9] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#2a567a] text-white text-center"
          >
            Agregar
          </Link>
        )}
      </div>
      <div>
        {vets.length === 0 ? (
          <div>
            <h1>No hay veterinarios</h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Apellido</th>
                  <th className="border border-gray-300 px-4 py-2">Edad</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                  {isAuthenticated &&
                    (userType === "admin" || userType === "superadmin") && (
                      <th className="border border-gray-300 px-4 py-2">
                        Acciones
                      </th>
                    )}
                </tr>
              </thead>
              <tbody>
                {vets.map((vet, index) => (
                  <tr key={vet._id || index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {vet.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vet.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vet.age} años
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vet.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vet.phone}
                    </td>
                    {isAuthenticated &&
                      (userType === "admin" || userType === "superadmin") && (
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex justify-center gap-10">
                            <Link
                              to={`/vets/${vet._id}`}
                              className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() =>
                                handleDelete(vet._id, deleteVet, "veterinario")
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
        )}
      </div>
    </div>
  );
}

export default VetsPage;

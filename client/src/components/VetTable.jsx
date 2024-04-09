import React from "react";
import { useVets } from "../context/VetsContext.jsx";
import { Link } from "react-router-dom";

export function VetCard({ vet }) {
  const { deleteVet } = useVets();
  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Apellido</th>
              <th className="border border-gray-300 px-4 py-2">Edad</th>
              <th className="border border-gray-300 px-4 py-2">Género</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Teléfono</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {vet.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {vet.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{vet.age}</td>
              <td className="border border-gray-300 px-4 py-2">{vet.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{vet.email}</td>
              <td className="border border-gray-300 px-4 py-2">{vet.phone}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/vets/${vet._id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => {
                    deleteVet(vet._id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

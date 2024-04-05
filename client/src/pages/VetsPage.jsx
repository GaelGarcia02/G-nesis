import React, { useEffect } from "react";
import { useVets } from "../context/VetsContext.jsx";
import { Link } from "react-router-dom";
import { VetCard } from "../components/VetCard.jsx";

function VetsPages() {
  const { getVets, deleteVet, vets } = useVets();

  useEffect(() => {
    getVets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <Link
          to="/vets/add"
          className="my-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
        >
          Agregar
        </Link>
      </div>
      <div>
        {vets.length === 0 ? (
          <div>
            <h1>No hay veterinarios</h1>
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Apellido</th>
                <th className="border border-gray-300 px-4 py-2">Edad</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vets.map((vet) => (
                <tr key={vet._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{vet.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{vet.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{vet.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{vet.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{vet.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/vets/${vet._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VetsPages;

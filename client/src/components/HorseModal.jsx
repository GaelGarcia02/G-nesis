import React from "react";
import { useHorses } from "../context/HorsesContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { handleDelete } from "../utils/sweetAlerts.js";

const HorseModal = ({ isOpen, onClose, horse }) => {
  const { deleteHorse } = useHorses();
  const { isAuthenticated, userType } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <header>
          <h2 className="text-xl text-center font-bold mb-10">{horse.name}</h2>
        </header>
        <div>
          <ul className="flex flex-col space-y-2">
            <li className="flex justify-between">
              <span className="font-bold">Edad:</span>
              <span>{horse.age} años</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Raza:</span>
              <span>{horse.breed}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Enfermedades:</span>
              <span>{horse.diseases}</span>
            </li>
          </ul>
        </div>
        {isAuthenticated &&
          (userType === "admin" || userType === "superadmin") && (
            <footer className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => {
                  handleDelete(horse._id, deleteHorse, "caballo");
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
              <Link
                to={`/horses/${horse._id}`}
                className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
              >
                Editar
              </Link>
            </footer>
          )}
      </div>
    </div>
  );
};

export default HorseModal;

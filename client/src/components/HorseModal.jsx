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
          <h2 className="text-xl text-center font-bold mb-4">{horse.name}</h2>
        </header>
        <div>
          <p>Edad: {horse.age} años</p>
          <p>Raza: {horse.breed}</p>
          <p>Enfermedades: {horse.diseases}</p>
        </div>
        {isAuthenticated &&
          (userType === "admin" || userType === "superadmin") && (
            <footer className="flex justify-center mt-6 space-x-4">
              <Link
                to={`/horses/${horse._id}`}
                className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
              >
                Editar
              </Link>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  handleDelete(horse._id, deleteHorse, "caballo");
                  onClose();
                }}
              >
                Eliminar
              </button>
            </footer>
          )}
      </div>
    </div>
  );
};

export default HorseModal;

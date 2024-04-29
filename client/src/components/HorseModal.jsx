import React, { useState, useEffect } from "react";
import { useHorses } from "../context/HorsesContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { handleDelete } from "../utils/sweetAlerts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faHeartbeat, faBolt } from "@fortawesome/free-solid-svg-icons";

const HorseModal = ({ isOpen, onClose, horse }) => {
  const { deleteHorse, getParams } = useHorses();
  const { isAuthenticated, userType } = useAuth();
  const [sensorParams, setSensorParams] = useState(null);

  useEffect(() => {
    const fetchSensorParams = async () => {
      try {
        const response = await getParams(horse.sensor);
        setSensorParams(response);
      } catch (error) {
        console.error("Error fetching sensor params:", error);
      }
    };

    if (isOpen && horse && horse.sensor) {
      fetchSensorParams();
    }
  }, [isOpen, horse, getParams]);

  if (!isOpen || !horse) return null;

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
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mt-4 mb-4">
            Datos de {horse.name}:
          </h3>
          <ul className="flex flex-col space-y-2">
            <li className="flex justify-between">
              <span className="font-semibold">Edad:</span>
              <span>{horse.age} años</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Raza:</span>
              <span>{horse.breed}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Enfermedades:</span>
              <span>{horse.diseases}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Sensor:</span>
              <span>{horse.sensor}</span>
            </li>
          </ul>
        </div>

        {sensorParams && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-center mt-4 mb-4">
              Datos del sensor:
            </h3>
            <ul className="flex flex-col space-y-2">
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faSun}
                    className="text-yellow-500 mr-2"
                  />
                  <span className="font-semibold">Nivel de Luz:</span>
                </div>
                <span>{sensorParams.nivel_luz}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faHeartbeat}
                    className="text-red-500 mr-2"
                  />
                  <span className="font-semibold">BPM:</span>
                </div>
                <span>{sensorParams.bpm} BpM</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faBolt}
                    className="text-blue-500 mr-2"
                  />

                  <span className="font-semibold">Velocidad:</span>
                </div>
                <span>{sensorParams.conto_pasos} km/h</span>
              </li>
            </ul>
          </div>
        )}

        {isAuthenticated && userType !== "common" && (
          <footer className="flex justify-center mt-6 space-x-4">
            <Link
              to={`/horses/${horse._id}`}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
            >
              Editar
            </Link>
            <button
              onClick={() => {
                handleDelete(horse._id, deleteHorse, "caballo");
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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

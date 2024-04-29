import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoToHorses = () => {
    navigate("/horses");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! Parece que la página que estás buscando no existe.
      </p>
      <button
        onClick={handleGoToHorses}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Ir al menú principal
      </button>
    </div>
  );
}

export default NotFoundPage;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useUsers } from "../context/UsersContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/sweetAlerts.js";

function Modal({ closeModal }) {
  const { logout } = useAuth();
  const { updateUser } = useUsers();
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await updateUser(id, { password, passwordChange: true });
      handleSuccess("Inicio de sesión exitoso");
      navigate("/horses");
    } catch (error) {
      setError("Hubo un error al cambiar la contraseña");
      handleError({ error });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-center text-xl font-bold mb-4">
          Cambiar Contraseña
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Cambiar Contraseña
          </button>
        </form>
        <button
          className="block w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={() => logout()}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Modal;

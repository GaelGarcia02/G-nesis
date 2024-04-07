import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function ProfilePage() {
  const { setValue } = useForm();
  const { getUser } = useUsers();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const userData = await getUser(params.id);
        setUser(userData);
        setValue("username", userData.username);
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("password", userData.password);
        setValue("typeUser", userData.typeUser);
        console.log(userData);
      }
    }
    loadUser();
  }, [params.id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-bold">Nombre de Usuario:</h1>
        <p className="text-lg font-normal">{user && user.username}</p>
      </div>

      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-bold">Nombre completo:</h1>
        <p className="text-lg font-normal">{user && user.name}</p>
      </div>

      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-bold">Email:</h1>
        <p className="text-lg font-normal">{user && user.email}</p>
      </div>

      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-bold">Reestablecer Contraseña</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Cambiar Contraseña
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative bg-white p-8 rounded-lg">
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Contraseña Actual"
                  className="mb-4 px-8 py-2"
                />
                <input
                  type="password"
                  placeholder="Nueva Contraseña"
                  className="mb-4 px-8 py-2"
                />
                <input
                  type="password"
                  placeholder="Confirmar Nueva Contraseña"
                  className="mb-4 px-8 py-2"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                  onClick={closeModal}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

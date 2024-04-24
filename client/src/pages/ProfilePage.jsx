import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleSuccess } from "../utils/sweetAlerts";
import userLogo from "../assets/user.png";

function ProfilePage() {
  const { setValue } = useForm();
  const { getUser, updateUser, verifyPassword } = useUsers();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const userData = await getUser(params.id);
        setUser(userData);
        setValue("username", userData.username);
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("typeUser", userData.typeUser);
      }
    }
    loadUser();
  }, [params.id]);

  const openFirstModal = () => {
    setIsFirstModalOpen(true);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeFirstModal = () => {
    setCurrentPassword("");
    setError("");
    setIsFirstModalOpen(false);
  };

  const closeSecondModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(false);
  };

  const handleFirstModalConfirm = async () => {
    try {
      // Verificar la contraseña actual
      const isPasswordCorrect = await verifyPassword(user._id, currentPassword);

      if (!isPasswordCorrect) {
        setError("La contraseña actual es incorrecta");
        return;
      }

      // Limpiar el error y abrir el segundo modal
      setError("");
      openSecondModal();
    } catch (error) {
      console.error("Error al verificar la contraseña:", error);
      setError("Hubo un error al verificar la contraseña");
    }
  };

  const handleSecondModalConfirm = async () => {
    try {
      // Validar contraseñas
      if (newPassword !== confirmNewPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      // Actualizar la contraseña
      await updateUser(params.id, { password: newPassword });

      // Limpiar campos y errores
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");

      // Cerrar modal
      closeSecondModal();
      handleSuccess("Contraseña actualizada correctamente");
    } catch (error) {
      setError("Hubo un error al actualizar la contraseña");
      console.error("Error al actualizar la contraseña:", error);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-10">Mi Perfil</h1>
        <div className="flex justify-center mb-14">
          <img
            src={userLogo}
            alt="Imagen del usuario"
            className="max-w-40% h-auto w-auto /**/ aspect-auto"
          />
        </div>
        <div className="flex justify-between gap-10 mb-8">
          <h1 className="text-xl font-bold">Nombre de Usuario:</h1>
          <p className="text-lg font-normal">{user && user.username}</p>
        </div>

        <div className="flex justify-between mb-8">
          <h1 className="text-xl font-bold">Nombre completo:</h1>
          <p className="text-lg font-normal">{user && user.name}</p>
        </div>

        <div className="flex justify-between mb-8">
          <h1 className="text-xl font-bold">Email:</h1>
          <p className="text-lg font-normal">{user && user.email}</p>
        </div>

        <div className="grid justify-center mt-16 mb-4">
          <div className="flex flex-col">
            <h1 className="text-xl flex font-bold">Cambio de Contraseña:</h1>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 transition duration-150 w-max ease-in-out text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={openFirstModal}
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
          {isFirstModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              <div className="relative bg-white p-8 rounded-lg">
                <div className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Contraseña Actual"
                    className="mb-4 px-8 py-2"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded my-2"
                    onClick={handleFirstModalConfirm}
                  >
                    Confirmar
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-600 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={closeFirstModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSecondModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              <div className="relative bg-white p-8 rounded-lg">
                <div className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    className="mb-4 px-8 py-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirmar Nueva Contraseña"
                    className="mb-4 px-8 py-2"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded my-2"
                    onClick={handleSecondModalConfirm}
                  >
                    Confirmar
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-600 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={closeSecondModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import React, { useEffect } from "react";
import { useUsers } from "../context/UsersContext.jsx";
import { Link } from "react-router-dom";

function UsersPage() {
  const { getUsers, users, deleteUser } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Usuarios</h1>
      <div className="flex justify-center">
        <Link
          to="/users/add"
          className="my-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
        >
          Agregar
        </Link>
      </div>
      <div>
        {users.length === 0 ? (
          <div>
            <h1>No hay usuarios</h1>
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Tipo de Usuario
                </th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.typeUser}
                  </td>
                  <td className="border border-gray-300 py-2">
                    <div className="flex justify-center gap-10">
                      <Link
                        to={`/users/${user._id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
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

export default UsersPage;

import React from 'react';
import { useUsers } from "../context/UsersContext.jsx";
import { Link } from "react-router-dom";

export function UserCard({ user }) {
  const { deleteUser } = useUsers();

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <tbody>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <td className="border border-gray-300 px-4 py-2">{user.username}</td>
        </tr>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Nombre</th>
          <td className="border border-gray-300 px-4 py-2">{user.name}</td>
        </tr>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <td className="border border-gray-300 px-4 py-2">{user.email}</td>
        </tr>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Tipo de Usuario</th>
          <td className="border border-gray-300 px-4 py-2">{user.typeUser}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2" colSpan="2">
            <Link to={`/users/${user._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
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
          </td>
        </tr>
      </tbody>
    </table>
  );
}

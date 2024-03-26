import { useUsers } from "../context/UsersContext.jsx";
import { Card } from "./ui/Card.jsx";
import { Link } from "react-router-dom";

export function UserCard({ user }) {
  const { deleteUser } = useUsers();
  return (
    <Card>
      <header>
        <h1 className="text-xl font-bold my-3">{user.username}</h1>
        <h1 className="text-xl font-bold my-3">{user.name}</h1>
      </header>

      <p className="mb-1">{user.email}</p>
      <p className="mb-1">{user.typeUser}</p>

      <footer className="flex gap-x-10 justify-center items-center mt-10">
        <Link to={`/users/${user._id}`}>Editar</Link>
        <button
          onClick={() => {
            deleteUser(user._id);
          }}
        >
          Eliminar
        </button>
      </footer>
      <hr className="my-5" />
    </Card>
  );
}

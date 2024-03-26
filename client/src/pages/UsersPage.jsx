import { useEffect } from "react";
import { useUsers } from "../context/UsersContext.jsx";
import { Link } from "react-router-dom";
import { UserCard } from "../components/UserCard.jsx";

function VetsPages() {
  const { getUsers, users } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-center lg:justify-start lg:mx-5">
        <Link
          to="/users/add"
          className="my-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
        >
          Agregar
        </Link>
      </div>
      <div className="">
        {users.length === 0 ? (
          <div>
            <h1>No hay usuarios</h1>
          </div>
        ) : (
          <div className="grid w-full gap-2 /**/  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {users.map((user) =>
              user._id ? <UserCard user={user} key={user._id} /> : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VetsPages;

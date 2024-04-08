import { useEffect, useContext } from "react";
import { useHorses } from "../context/HorsesContext.jsx";
import { Link } from "react-router-dom";
import { HorseCard } from "../components/HorseCard.jsx";
import { useAuth } from "../context/AuthContext";

function HorsesPages() {
  const { getHorses, horses } = useHorses();
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    getHorses();
  }, []);

  return (
    <div>
      <div className="flex justify-center lg:justify-start lg:mx-5">
        {isAuthenticated &&
          (userType === "admin" || userType === "superadmin") && (
            <Link
              to="/horses/add"
              className="mt-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
            >
              Agregar
            </Link>
          )}
      </div>

      <div className="">
        {horses.length === 0 ? (
          <div>
            <h1>No hay caballitos</h1>
          </div>
        ) : (
          <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-4">
            {horses.map((horse) => (
              <HorseCard horse={horse} key={horse._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HorsesPages;

import { useState, useEffect } from "react";
import HorseModal from "../components/HorseModal.jsx";
import HorseCard from "../components/HorseCard.jsx";
import { useHorses } from "../context/HorsesContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function HorsesPages() {
  const { getHorses, horses } = useHorses();
  const { isAuthenticated, userType } = useAuth();
  const [selectedHorse, setSelectedHorse] = useState(null);

  useEffect(() => {
    getHorses();
  }, []);

  const handleOpenModal = (horse) => {
    setSelectedHorse(horse);
  };

  const handleCloseModal = () => {
    setSelectedHorse(null);
  };

  return (
    <div>
      <div className="flex justify-center lg:justify-start lg:mx-5">
        {isAuthenticated && userType !== "common" && (
          <Link
            to="/horses/add"
            className="my-4 lg:mt-4 lg:my-0 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
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
          <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {horses.map((horse) => (
              <HorseCard
                horse={horse}
                key={horse._id}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Renderizar el modal */}
      <HorseModal
        isOpen={selectedHorse !== null}
        onClose={handleCloseModal}
        horse={selectedHorse}
      />
    </div>
  );
}

export default HorsesPages;

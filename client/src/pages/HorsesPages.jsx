import { useState, useEffect } from "react";
import HorseModal from "../components/HorseModal.jsx";
import HorseCard from "../components/HorseCard.jsx";
import { useHorses } from "../context/HorsesContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function HorsesPages() {
  const { getHorses, horses, getParams } = useHorses(); // Obtener la función getParams del contexto
  const { isAuthenticated, userType } = useAuth();
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [sensorParams, setSensorParams] = useState(null); // Estado para almacenar los parámetros del sensor

  useEffect(() => {
    getHorses();
  }, []);

  useEffect(() => {
    if (selectedHorse && isAuthenticated) {
      // Llamar a la función getParams solo si selectedHorse está definido y el usuario está autenticado
      getParams(selectedHorse.sensor)
        .then((params) => {
          setSensorParams(params);
        })
        .catch((error) => {
          console.error("Error fetching sensor params:", error);
          setSensorParams(null);
        });
    }
  }, [selectedHorse, isAuthenticated]); // Ejecutar el efecto cuando selectedHorse o isAuthenticated cambien

  const handleOpenModal = (horse) => {
    setSelectedHorse(horse);
  };

  const handleCloseModal = () => {
    setSelectedHorse(null);
    setSensorParams(null); // Limpiar los parámetros del sensor al cerrar el modal
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        Caballos Disponibles
      </h1>
      <div className="flex justify-center my-4 lg:mx-5">
        {isAuthenticated && userType !== "common" && (
          <Link
            to="/horses/add"
            className="my-4 lg:mt-4 lg:my-0 w-max bg-[#448dc9] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#2a567a] text-white text-center"
          >
            Agregar
          </Link>
        )}
      </div>

      <div className="mt-4">
        {horses.length === 0 ? (
          <div>
            <h1>No hay caballitos</h1>
          </div>
        ) : (
          <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
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

      {/* Renderizar el modal con los parámetros del sensor */}
      <HorseModal
        isOpen={selectedHorse !== null}
        onClose={handleCloseModal}
        horse={selectedHorse}
        sensorParams={sensorParams} // Pasar los parámetros del sensor al modal
      />
    </div>
  );
}

export default HorsesPages;

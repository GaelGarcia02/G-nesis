import { useEffect } from "react";
import { useVets } from "../context/VetsContext.jsx";
import { Link } from "react-router-dom";
import { VetCard } from "../components/VetCard.jsx";

function VetsPages() {
  const { getVets, vets } = useVets();

  useEffect(() => {
    getVets();
  }, []);

  return (
    <div>
      <div className="flex justify-center lg:justify-start lg:mx-5">
        <Link
          to="/vets/add"
          className="my-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white text-center"
        >
          Agregar
        </Link>
      </div>
      <div className="">
        {vets.length === 0 ? (
          <div>
            <h1>No hay veterinarios</h1>
          </div>
        ) : (
          <div className="grid w-full gap-2 /**/  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {vets.map((vet) =>
              vet._id ? <VetCard vet={vet} key={vet._id} /> : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VetsPages;

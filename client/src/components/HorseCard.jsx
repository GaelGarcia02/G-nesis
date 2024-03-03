import { useHorses } from "../context/HorsesContext.jsx";
import { Card } from "./ui/Card.jsx";
import { Link } from "react-router-dom";

export function HorseCard({ horse }) {
  const { deleteHorse } = useHorses();
  return (
    <Card>
      <header>
        <h1 className="text-xl font-bold my-3">{horse.name}</h1>
      </header>
      <p className="mb-1">{horse.age}</p>
      <p className="mb-1">{horse.breed}</p>
      <p className="mb-1">{horse.diseases}</p>
      <footer className="flex gap-x-10 justify-center items-center mt-10">
        <Link to={`/horses/${horse._id}`}>Editar</Link>
        <button
          onClick={() => {
            deleteHorse(horse._id);
          }}
        >
          Eliminar
        </button>
      </footer>
      <hr className="my-5" />
    </Card>
  );
}

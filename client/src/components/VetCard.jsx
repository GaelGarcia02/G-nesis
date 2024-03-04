import { useVets } from "../context/VetsContext.jsx";
import { Card } from "./ui/Card.jsx";
import { Link } from "react-router-dom";

export function VetCard({ vet }) {
  const { deleteVet } = useVets();
  return (
    <Card>
      <header>
        <h1 className="text-xl font-bold my-3">{vet.firstName}</h1>
        <h1 className="text-xl font-bold my-3">{vet.lastName}</h1>
      </header>

      <p className="mb-1">{vet.age}</p>
      <p className="mb-1">{vet.gender}</p>
      <p className="mb-1">{vet.email}</p>
      <p className="mb-1">{vet.phone}</p>
      <footer className="flex gap-x-10 justify-center items-center mt-10">
        <Link to={`/vets/${vet._id}`}>Editar</Link>
        <button
          onClick={() => {
            deleteVet(vet._id);
          }}
        >
          Eliminar
        </button>
      </footer>
      <hr className="my-5" />
    </Card>
  );
}

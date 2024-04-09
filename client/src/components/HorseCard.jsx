function HorseCard({ horse, onOpenModal }) {
  return (
    <div className="mb-5 mx-5 max-w-full bg-zinc-100 ">
      <div className="flex flex-col text-center my-4">
        <header>
          <h1 className="text-xl font-bold mb-4">{horse.name}</h1>
        </header>

        <footer className="">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            onClick={() => onOpenModal(horse)}
          >
            Ver Detalles
          </button>
        </footer>
      </div>
    </div>
  );
}

export default HorseCard;

import { useForm } from "react-hook-form";
import { useHorses } from "../context/HorsesContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HorseFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm();
  const {
    createHorse,
    getHorse,
    updateHorse,
    errors: horsesErrors,
    horseAdd,
  } = useHorses();
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function loadHorse() {
      if (params.id) {
        const horse = await getHorse(params.id);
        console.log(horse);
        setValue("name", horse.name);
        setValue("age", horse.age);
        setValue("breed", horse.breed);
        setValue("diseases", horse.diseases);
      }
    }
    loadHorse();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        updateHorse(params.id, data);
        setResetForm(true);
      } else {
        await createHorse(data);
        setResetForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (resetForm && horseAdd) {
      const timer = setTimeout(() => {
        setResetForm(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetForm, horseAdd]);

  useEffect(() => {
    if (resetForm && horseAdd) {
      navigate("/horses");
    }
  }, [resetForm, horseAdd, navigate]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mb-10 p-10 w-full /**/ xl:w-40% lg:w-50% md:w-60%">
        {horsesErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Agregar Caballo
          </h1>

          <div className="mb-4">
            <label className="font-medium" htmlFor="name">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              autoComplete="name"
              autoFocus
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.name && (
              <p className="text-red-500 mb-2">El nombre es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="age">
              Edad:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Edad"
              autoComplete="age"
              {...register("age", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.age && (
              <p className="text-red-500 mb-2">La edad es requerida</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="breed">
              Raza:
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              placeholder="Raza"
              autoComplete="breed"
              {...register("breed", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.breed && (
              <p className="text-red-500 mb-2">La raza es requerida</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="diseases">
              Enfermedades:
            </label>
            <textarea
              rows="3"
              id="diseases"
              name="diseases"
              placeholder="Enfermedades"
              autoComplete="diseases"
              {...register("diseases", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            ></textarea>
            {formErrors.diseases && (
              <p className="text-red-500 mb-2">
                Las enfermedades son requeridas
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
            >
              Hecho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HorseFormPage;

import { useForm } from "react-hook-form";
import { useHorses } from "../context/HorsesContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/sweetAlerts";

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
  const [title, setTitle] = useState("Agregar Caballo");
  const [formFields, setFormFields] = useState({
    name: "",
    age: "",
    breed: "",
    diseases: "",
  });

  useEffect(() => {
    async function loadHorse() {
      if (params.id) {
        const horse = await getHorse(params.id);
        console.log(horse);
        setValue("name", horse.name);
        setValue("age", horse.age);
        setValue("breed", horse.breed);
        setValue("diseases", horse.diseases);
        setTitle("Actualizar Caballo");
        setFormFields(horse);
      }
    }
    loadHorse();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        updateHorse(params.id, data);
        setResetForm(true);
        handleSuccess("Actualizado con éxito");
      } else {
        await createHorse(data);
        setResetForm(true);
        handleSuccess("Registrado con éxito");
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (resetForm && horseAdd) {
      handleSuccess("Registrado con éxito");
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

  useEffect(() => {
    if (horsesErrors && horsesErrors.length > 0) {
      const errorMessage = horsesErrors[0];
      handleError(`${errorMessage}`);
    }
  }, [horsesErrors]);

  // Función para verificar si algún campo está vacío
  const isFormEmpty = () => {
    return Object.values(formFields).some((value) => value === "");
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mb-10 p-10 w-full /**/ xl:w-40% lg:w-50% md:w-60%">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>

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
              onChange={(e) =>
                setFormFields({ ...formFields, name: e.target.value })
              }
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
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
              {...register("age", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
              onChange={(e) =>
                setFormFields({ ...formFields, age: e.target.value })
              }
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
              onChange={(e) =>
                setFormFields({ ...formFields, breed: e.target.value })
              }
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
              onChange={(e) =>
                setFormFields({ ...formFields, diseases: e.target.value })
              }
            ></textarea>
            {formErrors.diseases && (
              <p className="text-red-500 mb-2">
                Las enfermedades son requeridas
              </p>
            )}
          </div>

          <div className="flex justify-center gap-10">
            <Link to="#" onClick={() => window.history.back()}>
              <button className="my-4 w-max bg-gray-400 rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-gray-600 text-white">
                Regresar
              </button>
            </Link>
            <button
              type="submit"
              disabled={isFormEmpty()}
              className={`my-4 w-max rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out ${
                isFormEmpty()
                  ? "bg-[#336c97] cursor-not-allowed"
                  : "bg-[#448dc9] hover:bg-[#2a567a] text-white"
              }`}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HorseFormPage;

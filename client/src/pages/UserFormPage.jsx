import { useForm } from "react-hook-form";
import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/sweetAlerts";

function UserFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm();
  const {
    createUser,
    getUser,
    updateUser,
    errors: usersErrors,
    userAdd,
  } = useUsers();

  const navigate = useNavigate();

  const [resetForm, setResetForm] = useState(false);
  const [title, setTitle] = useState("Agregar Usuario");
  const params = useParams();
  const [formFields, setFormFields] = useState({
    username: "",
    name: "",
    email: "",
    typeUser: "",
  });

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        try {
          const user = await getUser(params.id);
          if (user) {
            setValue("username", user.username);
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("typeUser", user.typeUser);
            setTitle("Actualizar Usuario");
            setFormFields(user);
          } else {
            // Si no se encuentra el usuario, redirigir al usuario a una página de error o a la página principal
            navigate("/error"); // Puedes cambiar "/error" por la ruta que desees
          }
        } catch (error) {
          console.error(error);
          // Manejar el error
          navigate("/error");
        }
      }
    }
    loadUser();
  }, [params.id, getUser, setValue, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!validateEmail(data.email)) {
        throw new Error("Correo electrónico no válido");
      }

      if (params.id) {
        await updateUser(params.id, data);
        setResetForm(true);
      } else {
        await createUser(data);
        setResetForm(true);
      }
    } catch (error) {
      console.error(error);
      handleError(error.message);
    }
  });

  useEffect(() => {
    if (resetForm && userAdd) {
      handleSuccess("Usuario registrado correctamente");
      const timer = setTimeout(() => {
        setResetForm(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetForm, userAdd]);

  useEffect(() => {
    if (resetForm && userAdd) {
      navigate("/users");
    }
  }, [resetForm, userAdd, navigate]);

  useEffect(() => {
    if (usersErrors && usersErrors.length > 0) {
      const errorMessage = usersErrors[0];
      handleError(errorMessage);
    }
  }, [usersErrors]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.(com|co)$/i;
    return regex.test(email);
  };

  const isFormEmpty = () => {
    return Object.values(formFields).some((value) => value === "");
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mb-10 p-10 w-full /**/ xl:w-40% lg:w-50% md:w-60%">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
          <div className="mb-2">
            <label className="font-medium" htmlFor="username">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
              placeholder="Ej: NombreDeUsuario"
              id="username"
              onChange={(e) =>
                setFormFields({ ...formFields, username: e.target.value })
              }
            />
            {formErrors.username && (
              <p className="text-red-500">El nombre de usuario es requerido</p>
            )}
          </div>
          <div className="mb-2">
            <label className="font-medium" htmlFor="name">
              Nombre:
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
              placeholder="Ej: Sergio Amador"
              id="name"
              onChange={(e) =>
                setFormFields({ ...formFields, name: e.target.value })
              }
            />
            {formErrors.name && (
              <p className="text-red-500">El nombre es requerido</p>
            )}
          </div>
          <div className="mb-2">
            <label className="font-medium" htmlFor="email">
              Correo Electrónico:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
              placeholder="Ej: example@gmail.com"
              id="email"
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            {formErrors.email && (
              <p className="text-red-500">El email es requerido</p>
            )}
            {formErrors.email?.type === "validate" && (
              <p className="text-red-500">El email no es válido</p>
            )}
          </div>
          <div className="mb-2">
            <label className="font-medium" htmlFor="typeUser">
              Tipo de Usuario:
            </label>
            <select
              type="typeUser"
              {...register("typeUser", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
              placeholder="Seleccione el tipo de usuario"
              id="typeUser"
              onChange={(e) =>
                setFormFields({ ...formFields, typeUser: e.target.value })
              }
            >
              <option className="text-zinc-400" value="">
                --Seleccione el tipo de usuario--
              </option>
              <option value="common">Usuario Normal</option>
              <option value="manager">Usuario Encargado</option>
            </select>
            {formErrors.typeUser && (
              <p className="text-red-500">El tipo de usuario es requerido</p>
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

export default UserFormPage;

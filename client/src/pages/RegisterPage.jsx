import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen  /**/  lg:flex-row lg:overflow-hidden ">
      {/* logo */}
      <aside className="flex justify-center items-center w-4/12 max-h-60% min-h-20% /**/ lg:max-h-full lg:w-7/12 lg:h-full">
        <img
          src={logo}
          alt=""
          className="max-w-90% mb-6 /**/ lg:max-w-45% lg:mb-0 aspect-auto"
        />
      </aside>
      {/* Fondo verde */}
      <main className="bg-[#57ae60] w-12/12 p-8 flex flex-col /**/ lg:h-screen lg:justify-center lg:w-5/12 lg:mb-0 sm:items-center">
        {/* Formulario */}
        <div className="bg-white w-full p-10 rounded-lg mb-10 /**/ h-auto lg:mb-0 sm:max-w-85% xl:max-w-70%">
          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 mb-4 text-white text-center" key={i}>
              {error}
            </div>
          ))}
          <h1 className="text-2xl lg:mb-6 mb-4 text-center font-extrabold">
            Registro
          </h1>
          <form onSubmit={onSubmit}>
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
              />
              {errors.username && (
                <p className="text-red-500">
                  El nombre de usuario es requerido
                </p>
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
              />
              {errors.name && (
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
              />
              {errors.email && (
                <p className="text-red-500">El email es requerido</p>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium" htmlFor="password">
                Contraseña:
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="**************"
                id="password"
              />
              {errors.password && (
                <p className="text-red-500">La contraseña es requerida</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="my-4 w-full bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
              >
                Registrarse
              </button>
            </div>
          </form>
          <p className="flex justify-between mt-2">
            ¿Ya tienes cuenta?
            <Link to="/" className="text-sky-600">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/horses");
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen  /**/  lg:flex-row lg:overflow-hidden ">
      {/* logo */}
      <aside className="flex justify-center items-center w-4/12 max-h-60% min-h-20% /**/ lg:max-h-full lg:w-7/12 lg:h-full">
        <img
          src={logo}
          alt=""
          className="max-w-90% mb-6 h-auto w-full /**/ lg:max-w-45% lg:mb-0 aspect-auto"
        />
      </aside>
      {/* Fondo verde */}
      <main className="bg-[#57ae60] w-12/12 p-8 flex flex-col  /**/ lg:h-screen lg:justify-center lg:w-5/12 lg:mb-0 sm:items-center">
        <h1 className="text-5xl mb-10 font-extrabold text-white text-center">
          ¡Bienvenido!
        </h1>
        {/* Formulario */}
        <div className="bg-white w-full max-w-full p-10 rounded-lg mb-10 /**/ lg:mb-0 sm:max-w-85% xl:max-w-70%">
          {signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 mb-4 text-white text-center" key={i}>
              {error}
            </div>
          ))}
          <h1 className="text-2xl lg:mb-8 mb-4 text-center font-extrabold">
            Inicio de Sesión
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="font-medium" htmlFor="email">
                Correo Electrónico:
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="example@example.com"
                id="email"
              />
              {errors.email && (
                <p className="text-red-500 mb-2">El email es requerido</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-medium" htmlFor="password">
                Contraseña:
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="**********"
                id="password"
              />
              {errors.password && (
                <p className="text-red-500 mb-2">La contraseña es requerida</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="my-4 w-full bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
              >
                ENTRAR
              </button>
            </div>
            <p className="flex justify-between mt-4">
              ¿No tienes cuenta?
              <Link to="/register" className="text-sky-600">
                Registrarse
              </Link>
            </p>
            <div className="flex mt-8 justify-between">
              <FontAwesomeIcon icon={faGoogle} size="2x" />
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

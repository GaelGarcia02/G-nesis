import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.jpg";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { register, handleSubmit } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/horses");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen  /**/  lg:flex-row lg:overflow-hidden ">
      <aside className="flex justify-center items-center w-4/12 max-h-60% min-h-20% /**/ lg:max-h-full lg:w-7/12 lg:h-full">
        <img
          src={logo}
          alt=""
          className="max-w-90% mb-6 h-auto w-full /**/ lg:max-w-45% lg:mb-0 aspect-auto"
        />
      </aside>
      <main className="bg-[#57ae60] w-12/12 p-8 flex flex-col  /**/ lg:h-screen lg:justify-center lg:w-5/12 lg:mb-0 sm:items-center">
        <h1 className="text-5xl mb-10 font-extrabold text-white text-center">
          ¡Bienvenido!
        </h1>
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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="example@example.com"
                id="email"
              />
            </div>
            <div className="mb-4">
              <label className="font-medium" htmlFor="password">
                Contraseña:
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="**********"
                id="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!formData.email || !formData.password}
                className={`my-4 w-full rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out ${
                  !formData.email || !formData.password
                    ? "bg-[#438049] cursor-not-allowed"
                    : "bg-[#57ae60] hover:bg-[#376e3c] text-white"
                }`}
              >
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

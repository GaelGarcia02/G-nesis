import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu } from "react-icons/fi";

function Navbar() {
  const { user, logout, userType } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="bg-[#57ae60] flex justify-between items-center w-full py-3 px-4 text-white font-bold">
      <div className="flex items-center">
        <button
          onClick={handleMenuToggle}
          className="lg:hidden focus:outline-none"
        >
          <FiMenu className="text-3xl" />
        </button>
      </div>
      <div>
        <img src={logo} alt="Logo" className="w-10 lg:mr-auto lg:ml-0" />
      </div>

      <ul className="hidden lg:flex lg:gap-3 lg:mx-5">
        <li>
          <Link
            to="/horses"
            className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-6 py-3"
          >
            Inicio
          </Link>
        </li>
        {/*  */}
        {userType === "admin" && (
          <li>
            <Link
              to="/users"
              className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-6 py-3"
            >
              Usuarios
            </Link>
          </li>
        )}

        {/*  */}
        <li>
          <Link
            to="/vets"
            className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-6 py-3"
          >
            Veterinarios
          </Link>
        </li>
        <li>
          <Link
            to={user ? `profile/${user.id}` : "/"}
            className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-6 py-3"
          >
            Perfil
          </Link>
        </li>
      </ul>

      <Link
        to="/"
        onClick={() => logout()}
        className="hidden lg:block hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-6 py-3 ml-auto"
      >
        Cerrar Sesión
      </Link>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-[#57ae60] h-full w-64 py-4 px-6 flex flex-col relative">
            <div className="flex justify-end">
              <button
                onClick={handleMenuToggle}
                className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 flex justify-end mb-5 right-0 "
              >
                X
              </button>
            </div>
            <Link
              to="/horses"
              onClick={handleLinkClick}
              className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6"
            >
              Inicio
            </Link>
            {user && userType === "admin" && (
              <Link
                to="/users"
                className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6"
              >
                Usuarios
              </Link>
            )}
            <Link
              to="/vets"
              onClick={handleLinkClick}
              className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6"
            >
              Veterinarios
            </Link>

            <Link
              to="/profile"
              onClick={handleLinkClick}
              className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6"
            >
              Perfil
            </Link>
            <Link
              to="/"
              onClick={() => logout()}
              className="hover:bg-[#376e3c] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-2 mt-auto"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

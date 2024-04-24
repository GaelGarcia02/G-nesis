import React from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom"; // Asegúrate de incluir Outlet

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Cargando</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />; // Utiliza Outlet para renderizar las rutas secundarias
}

export default ProtectedRoute;

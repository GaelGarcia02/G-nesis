import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HorsesPages from "./pages/HorsesPages.jsx";
import HorseFormPage from "./pages/HorseFormPage.jsx";
import VetsPage from "./pages/VetsPage.jsx";
import VetsFormPage from "./pages/VetsFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MapPage from "./pages/MapPage.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import { HorseProvider } from "./context/HorsesContext.jsx";
import { VetProvider } from "./context/VetsContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HorseProvider>
          <VetProvider>
            <AppContent />
          </VetProvider>
        </HorseProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {!isLoginPage && (
          <Route element={<ProtectedRoute />}>
            <Route path="/horses" element={<HorsesPages />} />
            <Route path="/horses/add" element={<HorseFormPage />} />
            <Route path="/horses/:id" element={<HorseFormPage />} />

            <Route path="/vets" element={<VetsPage />} />
            <Route path="/vets/add" element={<VetsFormPage />} />
            <Route path="/vets/:id" element={<VetsFormPage />} />

            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;

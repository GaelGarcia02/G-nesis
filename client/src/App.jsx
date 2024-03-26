import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import RegisterUserPage from "./pages/RegisterUserPage";
import UsersPage from "./pages/UsersPage";
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
import { UserProvider } from "./context/UsersContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <HorseProvider>
            <VetProvider>
              <AppContent />
            </VetProvider>
          </HorseProvider>
        </UserProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {!isLoginPage && (
          <Route element={<ProtectedRoute />}>
            <Route path="/horses" element={<HorsesPages />} />
            <Route path="/horses/add" element={<HorseFormPage />} />
            <Route path="/horses/:id" element={<HorseFormPage />} />

            <Route path="/vets" element={<VetsPage />} />
            <Route path="/vets/add" element={<VetsFormPage />} />
            <Route path="/vets/:id" element={<VetsFormPage />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/add" element={<RegisterUserPage />} />
            <Route path="/users/:id" element={<RegisterUserPage />} />

            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;

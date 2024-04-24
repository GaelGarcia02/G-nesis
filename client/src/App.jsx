import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import RegisterUserPage from "./pages/UserFormPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import HorsesPages from "./pages/HorsesPages.jsx";
import HorseFormPage from "./pages/HorseFormPage.jsx";
import VetsPage from "./pages/VetsPage.jsx";
import VetsFormPage from "./pages/VetsFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import ReportsFormPage from "./pages/ReportsFormPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import { HorseProvider } from "./context/HorsesContext.jsx";
import { VetProvider } from "./context/VetsContext.jsx";
import { UserProvider } from "./context/UsersContext.jsx";
import { ReportProvider } from "./context/ReportsContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <HorseProvider>
            <VetProvider>
              <ReportProvider>
                <AppContent />
              </ReportProvider>
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
  const isVerificationPage = location.pathname.startsWith("/verification/");
  const isNotFoundPage = location.pathname === "/404"; // Cambiamos a la ruta correcta de la página 404

  const allowedRoutes = ["/horses", "/vets", "/users", "/reports", "/profile"];

  // Verificamos si la ruta actual corresponde a una de las páginas en las que queremos mostrar el Navbar
  const shouldShowNavbar = allowedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {shouldShowNavbar &&
        !isLoginPage &&
        !isVerificationPage &&
        !isNotFoundPage && <Navbar />}{" "}
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

            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/add" element={<ReportsFormPage />} />
            <Route path="/reports/:id" element={<ReportsFormPage />} />

            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/verification" element={<RedirectPage />} />
            <Route path="/verification/:id" element={<VerificationPage />} />
          </Route>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

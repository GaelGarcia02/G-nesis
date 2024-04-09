import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { isPasswordChangeRequired } = useAuth();

  useEffect(() => {
    // Verificar si se requiere cambiar la contraseña
    if (!isPasswordChangeRequired()) {
      // Redirigir al usuario a la página de caballos si no es necesario cambiar la contraseña
      navigate("/horses");
    }
  }, []);
};

export default VerificationPage;

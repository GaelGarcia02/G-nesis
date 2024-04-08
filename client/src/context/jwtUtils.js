import { jwtDecode } from "jwt-decode";

// Función para recuperar el token de las cookies
export const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split(".")[1];
    return token;
  }
  return null;
};

// Función para decodificar el token y obtener información del usuario
export const decodeToken = (token) => {
  if (token) {
    console.log("Token recibido:", token); // Verificar el token recibido
    const decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded); // Verificar el token decodificado
    const userType = decoded.typeUser;
    console.log("Tipo de usuario:", userType); // Verificar el tipo de usuario
    return userType;
  }
  return null;
};

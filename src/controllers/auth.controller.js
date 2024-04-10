import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

//* Login
export const login = async (req, res) => {
  //Especificas los campos que se necesitan para esta función
  const { email, password } = req.body;

  try {
    //Busca al usuario con el email y lo guarda en una variable
    const userFound = await User.findOne({ email });
    //Si no encuentra un usuario, manda error
    if (!userFound)
      return res.status(401).json({ message: "Credenciales Incorrectas" });

    //Compara la contraseña que se mandó con la contraseña que tiene el usuario encontrado (userFound)
    const isMatch = await bcryptjs.compare(password, userFound.password);
    //Si no coincide, manda el error
    if (!isMatch)
      return res.status(402).json({ message: "Credenciales Incorrectas" });

    /* if (!userFound.passwordChange) {
      return res.status(400).json({
        message: "Debe cambiar la contraseña antes de iniciar sesión",
      });
    } */

    //Crea el token
    const token = await createAccessToken({
      id: userFound._id,
      typeUser: userFound.typeUser, // Asegúrate de incluir typeUser en el payload
    });
    res.cookie("token", token);

    //Respuesta del servidor si sale todo bien
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      typeUser: userFound.typeUser,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Logout
export const logout = (req, res) => {
  //Al mandar una solicitud a la ruta del logout, de forma automática el token se borra
  res.cookie("token", "", {
    expires: new Date(0), //? Tiempo de expiración cambia a 0 (expira el token)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  });
};

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

//* Registrar
export const userRegister = async (req, res) => {
  //Especificas los campos que son requeridos para esta función
  const { username, name, email, password } = req.body;

  try {
    const emailFound = await User.findOne({ email });
    if (emailFound) return res.status(400).json(["El correo ya está en uso"]);

    const usernameFound = await User.findOne({ username });
    if (usernameFound)
      return res.status(400).json(["El nombre de usuario ya está en uso"]);

    //Encripta la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //Crea el nuevo usuario y lo almacena en una variable
    const newUser = new User({
      username,
      name,
      email,
      password: passwordHash, //? Se agrega la contraseña encriptada para que se suba así a la base de datos
    });

    //Método para guardar el nuevo usuario en la base de datos
    const userSaved = await newUser.save();

    //Crea el token
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    //Respuesta del servidor cuando todo sale bien
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    //Si algo sale mal, nos manda el error
    res.status(500).json({ message: error.message });
  }
};

//* Login
export const login = async (req, res) => {
  //Especificas los campos que se necesitan para esta función
  const { email, password } = req.body;

  try {
    //Busca al usuario con el email y lo guarda en una variable
    const userFound = await User.findOne({ email });
    //Si no encuentra un usuario, manda error
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    //Compara la contraseña que se mandó con la contraseña que tiene el usuario encontrado (userFound)
    const isMatch = await bcryptjs.compare(password, userFound.password);
    //Si no coincide, manda el error
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña Incorrecta" });

    //Crea el token
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    //Respuesta del servidor si sale todo bien
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
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

//* Mostrar Usuarios
export const showUsers = async (req, res) => {
  try {
    //Busca a los usuarios existentes
    const users = await User.find();
    //Muestra a los usuarios
    res.status(200).json(users);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar un Usuario
export const showUser = async (req, res) => {
  try {
    //Busca al Veterinario con el _id que le mandamos en la url
    const user = await User.findById(req.params.id);

    //Si no lo encuentra, manda mensaje de error
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    //Si lo encuentra, manda sus datos
    res.json(user);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Actualizar Usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = { ...req.body };

    // Verifica si la contraseña se ha incluido en la solicitud de actualización
    if (updatedUser.password) {
      // Encripta la nueva contraseña antes de actualizarla
      const salt = await bcryptjs.genSalt(10);
      updatedUser.password = await bcryptjs.hash(updatedUser.password, salt);
    }

    // Actualiza el usuario en la base de datos con la contraseña actualizada
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });

    //Si no encuentra al usuario, manda error
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    //Si todo sale bien, muestra de nuevo todos los campos ya actualizados
    res.json(user);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Eliminar Usuario
export const deleteUser = async (req, res) => {
  try {
    //Busca al usuario por su _id y lo elimina
    const user = await User.findByIdAndDelete(req.params.id);

    //Si no encuentra, manda error
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    //Mensaje de éxito si todo sale bien
    return res.sendStatus(200).json({ message: "Eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userSaved._id,
    username: userSaved.username,
    email: userSaved.email,
    createdAt: userSaved.createdAt,
    updatedAt: userSaved.updatedAt,
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

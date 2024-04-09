import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//* Registrar
export const userRegister = async (req, res) => {
  //Especificas los campos que son requeridos para esta función
  const { username, name, email, typeUser } = req.body;

  try {
    const emailFound = await User.findOne({ email });
    if (emailFound) return res.status(400).json(["El correo ya está en uso"]);

    const usernameFound = await User.findOne({ username });
    if (usernameFound)
      return res.status(400).json(["El nombre de usuario ya está en uso"]);

    //Crea el nuevo usuario y lo almacena en una variable
    const newUser = new User({
      username,
      name,
      email,
      typeUser,
    });

    //Método para guardar el nuevo usuario en la base de datos
    const userSaved = await newUser.save();

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

//* Mostrar Usuarios
export const showUsers = async (req, res) => {
  try {
    // Busca a los usuarios existentes cuyo typeUser sea "common" o "manager"
    const users = await User.find({ typeUser: { $in: ["common", "manager"] } });
    // Muestra a los usuarios
    res.status(200).json(users);
  } catch (error) {
    // Error si algo sale mal
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
    // Busca al usuario por su _id y lo elimina
    const user = await User.findByIdAndDelete(req.params.id);

    // Si no encuentra, manda error
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Mensaje de éxito si todo sale bien
    return res.status(200).json({ message: "Eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* Verificar Contraseña
export const verifyPassword = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const userId = req.params.id;

    // Buscar al usuario por su ID
    const user = await User.findById(userId);

    // Si no encuentra al usuario, enviar un mensaje de error
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    // Enviar el resultado de la verificación al cliente
    res.json({ isPasswordCorrect });
  } catch (error) {
    // Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

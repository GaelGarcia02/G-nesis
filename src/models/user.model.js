import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: "123456789",
    set: function (password) {
      // Verificar si la contraseña ingresada es igual a la contraseña por defecto
      if (password === "123456789") {
        const saltRounds = 10; // Número de rondas de hashing
        return bcrypt.hashSync(password, saltRounds);
      } else {
        return password; // Devolver la contraseña ingresada sin encriptar
      }
    },
  },
  typeUser: {
    type: String,
    required: true,
  },
  passwordChange: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);

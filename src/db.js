import mongoose from "mongoose";
const MONGO_URL =
  "mongodb+srv://gaelg:garciasalazar1221@genesis.cidbfud.mongodb.net/?retryWrites=true&w=majority&appName=Genesis";
// const MONGO_URL = "mongodb://localhost:27017/Genesis";

//Este archivo es para crear la conexion a base de datos
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connect DB");
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Vet", vetSchema);

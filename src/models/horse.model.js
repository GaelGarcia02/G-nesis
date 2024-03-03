import mongoose from "mongoose";

const horseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },

  breed: {
    type: String,
    required: true,
  },

  diseases: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Horse", horseSchema);

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  medicines: {
    type: String,
    required: true,
  },
  specifications: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  horseshoes: {
    type: String,
    required: true,
  },
  job: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Check", reportSchema);

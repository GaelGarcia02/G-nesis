import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  namehorse: {
    type: String,
    required: true,
    trim: true,
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
  updateDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Check", reportSchema);

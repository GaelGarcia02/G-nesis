import app from "../src/app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(3000, () => {
  console.log("Up");
});

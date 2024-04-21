import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.routes.js";
import vetRoute from "./routes/vets.routes.js";
import horseRoute from "./routes/horses.routes.js";
import userRoute from "./routes/users.routes.js";
import reportRoute from "./routes/report.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", vetRoute);
app.use("/api", horseRoute);
app.use("/api", userRoute);
app.use("/api", reportRoute);

export default app;
//a

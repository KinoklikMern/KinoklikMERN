import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";
import epkRoutes from "./routes/epk.js";
import fepkRoutes from "./routes/fepk.js";
import crewRoutes from "./routes/crew.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/epk", epkRoutes);
app.use("/fepks", fepkRoutes);
app.use("/crews", crewRoutes);

app.listen(8000, () => console.log(`App Running on PORT ${PORT}`));

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8000;

mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`Connected to MongoDB on PORT: ${PORT}!!!`);
  }
);

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/users.js";
import fepkRoutes from "./routes/fepk.js";
import crewRoutes from "./routes/crew.js";

// Edit by Tony On Jan 20, 2023
import filmMakerDashboard from "./routes/filmMakerDashboard.js";
// end ////
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/fepks", fepkRoutes);
app.use("/crews", crewRoutes);
// Edit by Tony On Jan 20, 2023
app.use("/filmmaker", filmMakerDashboard);
// end ////

app.listen(8000, () => console.log(`App Running on PORT ${PORT}`));

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', true); //Needs to be set for Mongoose 7, as default is false
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

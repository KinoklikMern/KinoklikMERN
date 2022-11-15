import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import {Storage} from "@google-cloud/storage";

import movieRoutes from "./routes/movies.js";

const app = express();

const gc = new Storage({
  keyFilename: path.join("gcs.keyfile.json"),
  project_id: "kinoklik-331517",
});

gc.getBuckets().then(x => console.log(x))

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/movies", movieRoutes);

app.listen(8000, () => console.log(`App Running on PORT ${PORT}`));

const CONNECTION_URL =
  "mongodb+srv://kinoklik:KinoKlik99!!@kinoklik.sk2izbk.mongodb.net/?retryWrites=true&w=majority";
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

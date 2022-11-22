import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import movieRoutes from './routes/movie.js';
import epkRoutes from './routes/epk.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/movies', movieRoutes);
app.use("/epk", epkRoutes);

app.listen(8000, () =>
  console.log(`App Running on PORT ${PORT}`),
);

const CONNECTION_URL = 'mongodb+srv://kinoklik:KinoKlik99!!@kinoklik.sk2izbk.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, err => {
   if(err) throw err;
   console.log(`Connected to MongoDB on PORT: ${PORT}!!!`)
})
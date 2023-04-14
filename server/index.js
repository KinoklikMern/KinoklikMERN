import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();

import userRoutes from "./routes/users.js";
import fepkRoutes from "./routes/fepk.js";
import crewRoutes from "./routes/crew.js";
import companyRoutes from "./routes/company.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

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
app.use("/company", companyRoutes);
// Edit by Tony On Jan 20, 2023
app.use("/filmmaker", filmMakerDashboard);
// end ////

// rucheng edit
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
//

const server = app.listen(8000, () =>
  console.log(`App Running on PORT ${PORT}`)
);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", true); //Needs to be set for Mongoose 7, as default is false
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

//Whenever someone connects this gets executed
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${process.env.BASE_URL}`,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (user, chat) => {
    socket.join(chat);
    console.log(`user ${user} joined chat: ${chat}`);
  });

  socket.on("typing", (chat) => {
    socket.in(chet).emit("typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    console.log("new msg", newMessageRecieved);
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log("user", user);
      console.log("sender", newMessageRecieved.sender);

      if (user._id == newMessageRecieved.sender._id) return; 
      console.log("111");

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

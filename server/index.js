import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import "express-async-errors";
import userRoutes from "./routes/users.js";
import fepkRoutes from "./routes/fepk.js";
import crewRoutes from "./routes/crew.js";
import companyRoutes from "./routes/company.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { errorHandler } from "./middlwares/error.js";
import { handleNotFound } from "./utils/helper.js";
import invitationRoutes from "./routes/invitations.js";

// Edit by Tony On Jan 20, 2023
import filmMakerDashboard from "./routes/filmMakerDashboard.js";

// end ////
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//invitations
app.use("/invitations", invitationRoutes);

app.use("/users", userRoutes);
app.use("/fepks", fepkRoutes);
//app.use("/actor", actorRoutes);
app.use("/crews", crewRoutes);
app.use("/company", companyRoutes);
// Edit by Tony On Jan 20, 2023
app.use("/filmmaker", filmMakerDashboard);
// end ////

// rucheng edit
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use("/*", handleNotFound);
app.use(errorHandler);

// Use your Stripe routes
app.use("/donations", donationRoutes);

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

// rucheng edit
//Whenever someone connects this gets executed
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${process.env.BASE_URL}`,
  },
});

io.on("connection", async (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log("11", userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (chat) => {
    socket.join(chat);
    console.log(`user joined chat: ${chat}`);
  });

  socket.on("new message", (newMessageRecieved) => {
    // console.log("222", newMessageRecieved.chat);
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log("user", user._id);
      console.log("sender", newMessageRecieved.sender._id);

      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

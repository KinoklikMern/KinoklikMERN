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
import axios from "axios";

// Edit by Tony On Jan 20, 2023
import filmMakerDashboard from "./routes/filmMakerDashboard.js";

// end ////
const app = express();

//proxy to be able to get a thumbnail directly from video from database
app.get("/video-proxy", async (req, res) => {
  try {
    const videoUrl = req.query.url; // Get the video URL from query parameters
    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "video/mp4"); // Set the correct content type
    response.data.pipe(res); // Stream the video data to the client
  } catch (error) {
    console.error("Error proxying video:", error);
    res.sendStatus(500);
  }
});

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
    // console.log("11", userData.id);

    // Yeming edit
    // If this user ID is not already in the onlineUsers object, add it
    if (!onlineUsers[userData.id]) {
      onlineUsers[userData.id] = new Set(); // Use a Set to prevent duplicates
    }

    onlineUsers[userData.id].add(socket.id); // Add socket ID to the Set

    socket.emit("connected");
    // onlineUsers[userData.id] = socket.id; // Store the socket ID
    // console.log(`[Setup] Current online users after setup:`, onlineUsers);
    io.emit("userOnline", userData.id); // broadcast to other connected clients
  });

  let onlineUsers = {}; // Tracks online users and their socket IDs
  let userLogoutIntents = {}; // Tracks whether a user has initiated a logout

  // When a user emits a logout event
  socket.on("logout", (userId) => {
    userLogoutIntents[userId] = true; // Mark the user's intent to logout
    // Wait for a short delay to ensure the disconnect event can be handled properly
    setTimeout(() => {
      if (!onlineUsers[userId]) {
        io.emit("userOffline", userId); // Notify other clients if user is no longer online
        // console.log(`User ${userId} marked offline after logout.`);
      }
      delete userLogoutIntents[userId]; // Clean up the logout intent
    }, 100);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    // Perform a lookup to see if this socket.id is associated with any user
    let foundUserId = Object.keys(onlineUsers).find(
      (userId) => onlineUsers[userId] === socket.id
    );

    if (foundUserId) {
      if (userLogoutIntents[foundUserId]) {
        // User intended to logout, emit userOffline
        io.emit("userOffline", foundUserId);
      }
      delete onlineUsers[foundUserId]; // Remove user from onlineUsers
    }
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

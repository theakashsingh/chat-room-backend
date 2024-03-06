import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Connecting");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server started on PORT ${port}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chitchatroom.netlify.app/",
  },
});

io.on("connection", socket => {
  console.log("connected to socket.io");
  socket.on("setup", userData => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", room => {
    socket.join(room);
    console.log(`User joined Room: ${room}`);
  });

  socket.on("typing", room => socket.in(room).emit("typing"));
  socket.on("stop typing", room => socket.in(room).emit("stop typing"));

  socket.on("new message", newMessageReceived => {
    let chat = newMessageReceived?.chat;
    if (!chat?.users) return console.log("chat.users not defined");
    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

// Import routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
  credentials: true
}));

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
  
  // This is where the server actually starts
  server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
  });
} catch (error) {
  console.log("Error starting server:", error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

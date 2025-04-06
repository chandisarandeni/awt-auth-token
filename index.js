import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//import routes
import userRoute from "./routes/userRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//use routes
app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

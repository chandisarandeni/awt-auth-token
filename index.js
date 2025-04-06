import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

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
    console.log(chalk.bgGreen("MongoDB connected successfully!\n"));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//use routes
app.use("/", userRoute);

app.listen(port, () => {
  console.log(
    chalk.gray("--------------------------------------------------------------")
  );
  console.log(`Server is running at ` + chalk.blue(`http://localhost:${port}`));
});

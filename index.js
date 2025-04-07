import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

//import routes
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { showLoadingAnimation } from "./controllers/common/loading-animation.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;

// Show loading animation while connecting to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    // Stop loading animation after successful connection
    await showLoadingAnimation();
    console.log(chalk.bgGreen("MongoDB connected successfully!\n"));
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToMongoDB();

//use routes
app.use("/", userRoute);
app.use("/", productRoute)

app.listen(port, () => {
  console.log(
    chalk.gray("--------------------------------------------------------------")
  );
  console.log(`Server is running at ` + chalk.blue(`http://localhost:${port}`));
});

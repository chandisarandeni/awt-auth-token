import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import chalk from "chalk";

//importing models
import User from "../../models/user.js";

// --------------------------------------------------------------------------
// Load environment variables from .env file
dotenv.config();

// Secret key for JWT (store securely in environment variables for production)
const JWT_SECRET = process.env.JWT_SECRET;

// --------------------------------------------------------------------------
// Helper function to generate JWT token
const getAuthToken = (user) => {
  const payload = { username: user.username, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// --------------------------------------------------------------------------
// Function to handle user registration
export async function registerUser(req, res) {
  const { username, password, role } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Output error message to the terminal
      console.log(
        "Register User Error: " + chalk.red("username already exists!")
      );

      return res.status(201).json({
        message: "username already exists!",
      });
    }

    // Check if username and password provided correctly
    if (username == null || password == null) {
      // Output error message to the terminal
      console.log(
        "Register User Error: " +
          chalk.red("username and password connot be blanck!")
      );

      return res.status(400).json({
        message: "username and password connot be blanck!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);

    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await user.save();

    // Output success message to the terminal
    console.log(chalk.green("User registered successfully!"));
    console.log(chalk.hex("#FF6600")("Username \t: ") + user.username);
    console.log(chalk.hex("#FF6600")("Role \t\t: ") + user.role);

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    // Output error message to the terminal
    console.log("Register User Error: ");
    console.error(chalk.red(error.message));

    // Return error response
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

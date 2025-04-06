import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Importing models
import User from "../models/user.js";

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
export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save user to DB
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        role: user.role,
      },
    });
    // Output to the terminal
    console.log("User registered:");
    console.log("Username:", user.username);
    console.log("Role:", user.role);
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// --------------------------------------------------------------------------
// Function to handle user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Ensure username and password are provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Fetch user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generate JWT token
    const token = getAuthToken(user);

    // Output user details without password
    console.log("User logged in:");
    console.log("Username:", user.username);
    console.log("Role:", user.role);
    console.log("Token:", token);

    // Return success response with token
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

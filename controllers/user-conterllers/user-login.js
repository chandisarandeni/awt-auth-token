import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import chalk from "chalk";

// Importing models
import User from "../../models/user.js";

// Load environment variables from .env file
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(chalk.red("JWT_SECRET is not defined in .env file."));
  process.exit(1); // Exit the process if JWT_SECRET is not defined
}

// Function to handle user login
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Ensure username and password are provided
    if (!username || !password) {
      //Output error message to the terminal
      console.log(
        "Login Error: " + chalk.red("username and password cannot be blank!")
      );

      return res.status(400).json({
        message: "username and password cannot be blank!",
      });
    }

    // Fetch user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Output error to the terminal
      console.log("login Error: " + chalk.red("Invalid username or password!"));

      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generate JWT token
    const token = getAuthToken(user);

    // Output the details of the logged in user
    console.log("");
    console.log("User logged in:");
    console.log(chalk.hex("#FF6600")("Username \t: ") + user.username);
    console.log(chalk.hex("#FF6600")("Role \t\t: ") + user.role);
    console.log(chalk.hex("#FF6600")("Token \t\t: ") + token);

    // Return success response with token
    return res.status(201).json({
      message: "User logged in successfully",
      user: {
        username: user.username,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.error(chalk.red("Error during user login: "), error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

function getAuthToken(user) {
  try {
    const payload = { username: user.username, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.error(chalk.red("Error generating token: "), error);
    return null;
  }
}

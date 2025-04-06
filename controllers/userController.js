import bcrypt from "bcrypt";

// Importing models
import User from "../models/user.js";

/// Function to handle user registration
export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

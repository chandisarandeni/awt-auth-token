import bcrypt from "bcrypt";

// Register a new user
export const registerUser = async (req, res) => {
  // Get user data from request body
  const { username, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const User = new User({
      username,
      password: hashedPassword,
      role,
    });

    // save the user to the database
    await User.save().then(() => {
      res.status(201).json({
        message: "User registered successfully",
        user: {
          username: User.username,
          role: User.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

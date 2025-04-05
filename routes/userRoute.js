import express from "express";

//import routes
import { registerUser } from "../controllers/userController.js";

// Create a new router instance
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

export default router;

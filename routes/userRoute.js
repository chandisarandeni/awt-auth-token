import express from "express";

//import routes
import { registerUser } from "../controllers/user-conterllers/add-user.js";
import { loginUser } from "../controllers/user-conterllers/user-login.js";

// Create a new router instance
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

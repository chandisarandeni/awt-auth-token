import express from "express";

// Import routes
import { addProduct } from "../controllers/product-controller/add-product.js";

// Create a new router instance
const router = express.Router();

// Route to add a new product
router.post("/add-product", addProduct);

// Export the router
export default router;

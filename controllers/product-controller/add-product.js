import express from "express";
import chalk from "chalk";
import jwt from "jsonwebtoken";

// Import models
import Product from "../../models/product.js";

export async function addProduct(req, res) {
  const { productId, productName, productDescription, productPrice } = req.body;

  try {
    // Check if token is provided in authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    if (!token) {
      console.log("Error: " + chalk.red("Authorization token is missing!"));
      return res.status(401).json({
        message: "Authorization token is missing!",
      });
    }

    // Verify the token and extract user data
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("Error: " + chalk.red("Invalid or expired token!"));
      return res.status(403).json({
        message: "Invalid or expired token!",
      });
    }

    // Check if the user has admin role
    if (decodedToken.role !== "admin") {
      console.log("Error: " + chalk.red("You are not authorized!"));
      return res.status(403).json({
        message: "You are not authorized!",
      });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      console.log("Add Product Error: " + chalk.red("Product already exists!"));
      return res.status(400).json({
        message: "Product already exists!",
      });
    }

    // Check if all fields are filled
    if (!productId || !productName || !productDescription || !productPrice) {
      console.log("Error: " + chalk.red("All fields are required!"));
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    // Create a new product
    const product = new Product({
      productId,
      productName,
      productDescription,
      productPrice,
    });

    // Save the product to the database
    await product.save();

    // Output success message to the terminal
    console.log("");
    console.log(chalk.green("Product added successfully!"));
    console.log(chalk.hex("#FF6600")("Product ID \t\t: ") + product.productId);
    console.log(
      chalk.hex("#FF6600")("Product Name \t\t: ") + product.productName
    );
    console.log(
      chalk.hex("#FF6600")("Product Description \t: ") +
        product.productDescription
    );
    console.log(
      chalk.hex("#FF6600")("Product Price \t\t: ") + product.productPrice
    );

    // Return success response
    return res.status(201).json({
      message: "Product saved successfully!",
      product: {
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

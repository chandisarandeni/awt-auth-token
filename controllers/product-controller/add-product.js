import express from "express";
import chalk from "chalk";

// Import models
import Product from "../../models/product.js";

export async function addProduct(req, res) {
  const { productId, productName, productDescription, productPrice } = req.body;

  try {
    // Check if product already exists
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      // Output error message to the terminal
      console.log("");
      console.log("Add Product Error: " + chalk.red("Product already exists!"));

      // Return error response
      return res.status(201).json({
        message: "Product already exists!",
      });
    }

    // Check filled all fields
    if (!productId || !productName || !productDescription || !productPrice) {
      // Output error message to the terminal
      console.log("Error: " + chalk.red("All fields are required!"));

      // Return error response
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

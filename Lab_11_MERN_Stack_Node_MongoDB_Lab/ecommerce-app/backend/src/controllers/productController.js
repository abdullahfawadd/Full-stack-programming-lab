import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid product ID");
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

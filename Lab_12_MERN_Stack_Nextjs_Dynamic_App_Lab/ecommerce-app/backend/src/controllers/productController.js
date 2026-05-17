import mongoose from "mongoose";
import Product from "../models/Product.js";

const allowedFields = [
  "name",
  "category",
  "price",
  "oldPrice",
  "image",
  "gallery",
  "description",
  "details",
  "material",
  "dimensions",
  "care",
  "stock",
  "rating",
  "featured",
  "tags",
];

const cleanProductInput = (body) =>
  allowedFields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }

    return payload;
  }, {});

export const getProducts = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({
      featured: -1,
      createdAt: -1,
    });

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
    const product = await Product.create(cleanProductInput(req.body));

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid product ID");
    }

    const product = await Product.findByIdAndUpdate(
      id,
      cleanProductInput(req.body),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid product ID");
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

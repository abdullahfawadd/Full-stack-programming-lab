import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      maxlength: [60, "Product category cannot exceed 60 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    oldPrice: {
      type: Number,
      min: [0, "Old price cannot be negative"],
      default: null,
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [1400, "Product description cannot exceed 1400 characters"],
    },
    details: {
      type: [String],
      default: [],
    },
    material: {
      type: String,
      default: "Natural ceramic and sealed wood",
      trim: true,
    },
    dimensions: {
      type: String,
      default: "Compact tabletop scale",
      trim: true,
    },
    care: {
      type: String,
      default: "Wipe clean with a soft cloth",
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Product stock cannot be negative"],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
      default: 4.8,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    collection: "products",
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

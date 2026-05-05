import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [1200, "Product description cannot exceed 1200 characters"],
    },
  },
  {
    collection: "products",
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

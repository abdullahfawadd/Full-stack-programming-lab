import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.bulkWrite(
      products.map((product) => ({
        updateOne: {
          filter: { name: product.name },
          update: { $set: product },
          upsert: true,
        },
      })),
    );
    console.log("Products seeded successfully");
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedProducts();

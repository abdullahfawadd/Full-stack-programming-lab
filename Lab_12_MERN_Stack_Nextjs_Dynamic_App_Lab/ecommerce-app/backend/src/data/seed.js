import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config();

const seedDatabase = async () => {
  await connectDB();
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(products);

  console.log(
    `Seeded ${createdProducts.length} products into lab12_dynamic_ecommerce.products`,
  );

  await mongoose.connection.close();
};

seedDatabase().catch(async (error) => {
  console.error(`Seed failed: ${error.message}`);
  await mongoose.connection.close();
  process.exit(1);
});

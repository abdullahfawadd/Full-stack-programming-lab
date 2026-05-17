import mongoose from "mongoose";

const DEFAULT_MONGO_URI =
  "mongodb://127.0.0.1:27017/lab12_dynamic_ecommerce";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`,
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

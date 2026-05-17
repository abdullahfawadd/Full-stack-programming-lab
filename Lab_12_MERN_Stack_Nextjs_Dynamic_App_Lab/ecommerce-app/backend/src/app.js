import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Lab 12 Rustik Commerce API is running",
    student: "M Abdullah",
    database: "lab12_dynamic_ecommerce",
    collection: "products",
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

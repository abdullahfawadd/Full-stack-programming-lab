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
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ecommerce API is running",
    student: "M Abdullah",
    registrationId: "232052",
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

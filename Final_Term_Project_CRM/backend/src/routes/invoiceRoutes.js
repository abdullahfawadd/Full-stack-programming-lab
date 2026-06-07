import express from "express";
import { z } from "zod";
import {
  createInvoice,
  getInvoice,
  getInvoices,
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const invoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  services: z
    .array(
      z.object({
        description: z.string().trim().min(2, "Service description is required"),
        quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
        rate: z.coerce.number().min(0, "Rate cannot be negative"),
      }),
    )
    .min(1, "At least one service is required"),
  summary: z.string().trim().optional().default(""),
  dueDate: z.coerce.date(),
  status: z.enum(["Draft", "Sent", "Paid"]).optional().default("Draft"),
});

router.use(protect);
router.route("/").get(getInvoices).post(validate(invoiceSchema), createInvoice);
router.route("/:id").get(getInvoice);

export default router;

import express from "express";
import { z } from "zod";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const customerSchema = z.object({
  name: z.string().trim().min(2, "Customer name is required"),
  email: z.email("Enter a valid customer email").trim().toLowerCase(),
  phone: z.string().trim().min(5, "Phone is required"),
  company: z.string().trim().min(2, "Company is required"),
  status: z.enum(["Lead", "Active", "Inactive"]),
  source: z.string().trim().min(2, "Source is required"),
  value: z.coerce.number().min(0, "Value cannot be negative"),
  owner: z.string().trim().min(2, "Owner is required"),
  lastContacted: z.coerce.date(),
  notes: z.string().trim().optional().default(""),
});

router.use(protect);
router.route("/").get(getCustomers).post(validate(customerSchema), createCustomer);
router
  .route("/:id")
  .get(getCustomer)
  .put(validate(customerSchema), updateCustomer)
  .delete(deleteCustomer);

export default router;

import mongoose from "mongoose";

const serviceLineSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { _id: false },
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    services: {
      type: [serviceLineSchema],
      validate: [(value) => value.length > 0, "At least one service is required"],
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid"],
      default: "Draft",
    },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;

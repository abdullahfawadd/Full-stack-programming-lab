import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Lead", "Active", "Inactive"],
      default: "Lead",
    },
    source: {
      type: String,
      default: "Website",
      trim: true,
    },
    value: {
      type: Number,
      min: 0,
      default: 0,
    },
    owner: {
      type: String,
      default: "M Abdullah",
      trim: true,
    },
    lastContacted: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

customerSchema.index({ name: "text", company: "text", email: "text" });

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

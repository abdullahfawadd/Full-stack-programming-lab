import "dotenv/config";
import connectDB from "../config/db.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";
import User from "../models/User.js";
import { customers, demoUser } from "./seedData.js";

await connectDB();

await Promise.all([Customer.deleteMany({}), Invoice.deleteMany({}), User.deleteMany({})]);

const user = await User.create(demoUser);
const insertedCustomers = await Customer.insertMany(customers);

const activeCustomer = insertedCustomers.find((customer) => customer.status === "Active");

if (activeCustomer) {
  await Invoice.create({
    invoiceNumber: "VCR-20260601-DEMO",
    customer: activeCustomer._id,
    services: [
      { description: "CRM onboarding sprint", quantity: 1, rate: 85000 },
      { description: "Custom dashboard configuration", quantity: 2, rate: 42000 },
    ],
    summary: "Initial onboarding and dashboard setup for premium CRM workflow.",
    dueDate: new Date("2026-06-20"),
    total: 169000,
    status: "Sent",
  });
}

console.log(`Seeded user: ${user.email}`);
console.log(`Seeded ${insertedCustomers.length} customers`);

process.exit(0);

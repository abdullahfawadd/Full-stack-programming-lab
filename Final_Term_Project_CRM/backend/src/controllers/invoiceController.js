import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

const calculateTotal = (services) =>
  services.reduce((total, service) => total + service.quantity * service.rate, 0);

const createInvoiceNumber = () => {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `VCR-${stamp}-${suffix}`;
};

export const getInvoices = async (_req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: invoices });
  } catch (error) {
    return next(error);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("customer");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({ data: invoice });
  } catch (error) {
    return next(error);
  }
};

export const createInvoice = async (req, res, next) => {
  try {
    const { customerId, services, summary = "", dueDate, status = "Draft" } = req.body;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const invoice = await Invoice.create({
      invoiceNumber: createInvoiceNumber(),
      customer: customerId,
      services,
      summary,
      dueDate,
      status,
      total: calculateTotal(services),
    });

    const populatedInvoice = await invoice.populate("customer");
    return res.status(201).json({ data: populatedInvoice });
  } catch (error) {
    return next(error);
  }
};

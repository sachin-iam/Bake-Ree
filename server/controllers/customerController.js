import Customer from "../models/Customer.js";

// GET /api/customers (with filters, search, status, pagination)
export const getCustomers = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // 🔍 Enhanced search to include name, email, and phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    // 🔘 Status filter
    if (status !== "all") {
      query.isActive = status === "active";
    }

    // 📅 Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Customer.countDocuments(query);

    res.json({ customers, total });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// GET /api/customers/:id
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching customer", error: err.message });
  }
};

// POST /api/customers
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, isActive = true } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      isActive,
    });
    res.status(201).json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create customer", error: err.message });
  }
};

// PUT /api/customers/:id
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update customer", error: err.message });
  }
};

// PATCH /api/customers/:id/toggle
export const toggleActiveStatus = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    customer.isActive = !customer.isActive;
    await customer.save();

    res.json({ message: "Status updated", isActive: customer.isActive });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to toggle status", error: err.message });
  }
};

// DELETE /api/customers/:id
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete customer", error: err.message });
  }
};

// DELETE /api/customers (bulk delete)
export const bulkDeleteCustomers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No customer IDs provided for bulk delete" });
    }

    await Customer.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Customers deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed bulk delete", error: err.message });
  }
};

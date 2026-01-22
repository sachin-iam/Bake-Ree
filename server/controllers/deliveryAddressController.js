import mongoose from "mongoose";
import DeliveryAddress from "../models/DeliveryAddress.js";

/**
 * Get all addresses for logged-in user
 */
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user._id;

    const addresses = await DeliveryAddress.find({
      user: userId,
      isActive: true,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get address by ID
 */
export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid address ID" });
    }

    const address = await DeliveryAddress.findOne({
      _id: id,
      user: userId,
      isActive: true,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Create new delivery address
 */
export const createAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      label,
      customLabel,
      recipientName,
      phone,
      address,
      isDefault,
    } = req.body;

    // Validate required fields
    if (!recipientName || !phone || !address?.street || !address?.city || !address?.state || !address?.zipCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // If this is set as default, unset other defaults
    if (isDefault) {
      await DeliveryAddress.updateMany(
        { user: userId, isDefault: true },
        { isDefault: false }
      );
    }

    const newAddress = await DeliveryAddress.create({
      user: userId,
      label: label || "Home",
      customLabel: customLabel || "",
      recipientName,
      phone,
      address,
      isDefault: isDefault || false,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Update delivery address
 */
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid address ID" });
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault) {
      await DeliveryAddress.updateMany(
        { user: userId, isDefault: true, _id: { $ne: id } },
        { isDefault: false }
      );
    }

    const address = await DeliveryAddress.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Delete delivery address (soft delete)
 */
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid address ID" });
    }

    const address = await DeliveryAddress.findOneAndUpdate(
      { _id: id, user: userId },
      { isActive: false },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Set default address
 */
export const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid address ID" });
    }

    // Unset all other defaults
    await DeliveryAddress.updateMany(
      { user: userId, isDefault: true },
      { isDefault: false }
    );

    // Set this as default
    const address = await DeliveryAddress.findOneAndUpdate(
      { _id: id, user: userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({ error: "Server error" });
  }
};


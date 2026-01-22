import DeliveryAddress from "../models/DeliveryAddress.js";

/**
 * Get all addresses for logged-in user
 * GET /api/addresses
 */
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await DeliveryAddress.find({ user: userId }).sort({
      isDefault: -1, // Default address first
      createdAt: -1,
    });

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error getting addresses:", error);
    res.status(500).json({ error: "Failed to get addresses" });
  }
};

/**
 * Get a specific address by ID
 * GET /api/addresses/:id
 */
export const getAddressById = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    const address = await DeliveryAddress.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error getting address:", error);
    res.status(500).json({ error: "Failed to get address" });
  }
};

/**
 * Add new address
 * POST /api/addresses
 */
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    // Validation
    if (!label || !fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // If this is set as default, unset other defaults
    if (isDefault) {
      await DeliveryAddress.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const address = await DeliveryAddress.create({
      user: userId,
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2: addressLine2 || "",
      city,
      state,
      postalCode,
      country: country || "India",
      isDefault: isDefault || false,
    });

    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Failed to add address" });
  }
};

/**
 * Update address
 * PUT /api/addresses/:id
 */
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const updateData = req.body;

    // Check if address belongs to user
    const address = await DeliveryAddress.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault === true) {
      await DeliveryAddress.updateMany(
        { user: userId, _id: { $ne: addressId } },
        { isDefault: false }
      );
    }

    const updatedAddress = await DeliveryAddress.findByIdAndUpdate(
      addressId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Failed to update address" });
  }
};

/**
 * Delete address
 * DELETE /api/addresses/:id
 */
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    const address = await DeliveryAddress.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Failed to delete address" });
  }
};

/**
 * Set default address
 * PATCH /api/addresses/:id/set-default
 */
export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    // Check if address belongs to user
    const address = await DeliveryAddress.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Unset all other defaults
    await DeliveryAddress.updateMany(
      { user: userId, _id: { $ne: addressId } },
      { isDefault: false }
    );

    // Set this as default
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({ error: "Failed to set default address" });
  }
};

export default {
  getUserAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};


import mongoose from "mongoose";
import DeliveryZone from "../models/DeliveryZone.js";

/**
 * Get all delivery zones (Admin only)
 */
export const getAllZones = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const zones = await DeliveryZone.find(query).sort({ name: 1 });

    res.json(zones);
  } catch (error) {
    console.error("Error fetching zones:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get zone by ID
 */
export const getZoneById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid zone ID" });
    }

    const zone = await DeliveryZone.findById(id);

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    res.json(zone);
  } catch (error) {
    console.error("Error fetching zone:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Create new delivery zone (Admin only)
 */
export const createZone = async (req, res) => {
  try {
    const {
      name,
      description,
      deliveryCharge,
      minimumOrderAmount,
      estimatedDeliveryTime,
      boundaries,
      center,
      radius,
    } = req.body;

    if (!name || !center?.lat || !center?.lng) {
      return res.status(400).json({
        error: "Name and center coordinates are required",
      });
    }

    const zone = await DeliveryZone.create({
      name,
      description: description || "",
      deliveryCharge: deliveryCharge || 0,
      minimumOrderAmount: minimumOrderAmount || 0,
      estimatedDeliveryTime: estimatedDeliveryTime || 45,
      boundaries: boundaries || [],
      center,
      radius: radius || 5,
      isActive: true,
    });

    res.status(201).json(zone);
  } catch (error) {
    console.error("Error creating zone:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Zone name already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Update delivery zone (Admin only)
 */
export const updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid zone ID" });
    }

    const zone = await DeliveryZone.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    res.json(zone);
  } catch (error) {
    console.error("Error updating zone:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Zone name already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Delete delivery zone (Admin only)
 */
export const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid zone ID" });
    }

    const zone = await DeliveryZone.findByIdAndDelete(id);

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    res.json({ message: "Zone deleted successfully" });
  } catch (error) {
    console.error("Error deleting zone:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Find zone for given coordinates
 */
export const findZoneForCoordinates = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: "Latitude and longitude are required",
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const zones = await DeliveryZone.find({ isActive: true });

    for (const zone of zones) {
      if (zone.center && zone.radius) {
        const distance = calculateDistance(
          latitude,
          longitude,
          zone.center.lat,
          zone.center.lng
        );
        if (distance <= zone.radius) {
          return res.json(zone);
        }
      }
    }

    res.status(404).json({ error: "No delivery zone found for this location" });
  } catch (error) {
    console.error("Error finding zone:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Helper function to calculate distance between two coordinates
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}


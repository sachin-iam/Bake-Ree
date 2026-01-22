import CustomerProfile from "../models/CustomerProfile.js";

/**
 * Get notification preferences for logged-in user
 */
export const getNotificationPreferences = async (req, res) => {
  try {
    const profile = await CustomerProfile.findOne({ user: req.user._id });

    if (!profile) {
      // Return default preferences if profile doesn't exist
      return res.status(200).json({
        email: {
          orderUpdates: true,
          promotions: true,
          pointsEarned: true,
          tierUpgrades: true,
        },
        inApp: {
          orderUpdates: true,
          promotions: true,
          pointsEarned: true,
          tierUpgrades: true,
        },
        push: {
          orderUpdates: false,
          promotions: false,
          pointsEarned: false,
          tierUpgrades: false,
        },
      });
    }

    res.status(200).json(profile.notificationPreferences || {
      email: {
        orderUpdates: true,
        promotions: true,
        pointsEarned: true,
        tierUpgrades: true,
      },
      inApp: {
        orderUpdates: true,
        promotions: true,
        pointsEarned: true,
        tierUpgrades: true,
      },
      push: {
        orderUpdates: false,
        promotions: false,
        pointsEarned: false,
        tierUpgrades: false,
      },
    });
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    res.status(500).json({ error: "Failed to fetch notification preferences" });
  }
};

/**
 * Update notification preferences for logged-in user
 */
export const updateNotificationPreferences = async (req, res) => {
  try {
    const { email, inApp, push } = req.body;

    // Validate structure
    const validChannels = ["email", "inApp", "push"];
    const validTypes = ["orderUpdates", "promotions", "pointsEarned", "tierUpgrades"];

    const preferences = {};
    
    if (email) {
      preferences["notificationPreferences.email"] = {};
      validTypes.forEach((type) => {
        if (email[type] !== undefined) {
          preferences["notificationPreferences.email"][type] = email[type];
        }
      });
    }

    if (inApp) {
      preferences["notificationPreferences.inApp"] = {};
      validTypes.forEach((type) => {
        if (inApp[type] !== undefined) {
          preferences["notificationPreferences.inApp"][type] = inApp[type];
        }
      });
    }

    if (push) {
      preferences["notificationPreferences.push"] = {};
      validTypes.forEach((type) => {
        if (push[type] !== undefined) {
          preferences["notificationPreferences.push"][type] = push[type];
        }
      });
    }

    // Update or create profile with preferences
    const profile = await CustomerProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: preferences },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Notification preferences updated successfully",
      preferences: profile.notificationPreferences,
    });
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    res.status(500).json({ error: "Failed to update notification preferences" });
  }
};


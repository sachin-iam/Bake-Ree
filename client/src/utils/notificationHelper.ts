import type { Notification } from "../types/notification";

interface NotificationPreferences {
  email: {
    orderUpdates: boolean;
    promotions: boolean;
    pointsEarned: boolean;
    tierUpgrades: boolean;
  };
  inApp: {
    orderUpdates: boolean;
    promotions: boolean;
    pointsEarned: boolean;
    tierUpgrades: boolean;
  };
  push: {
    orderUpdates: boolean;
    promotions: boolean;
    pointsEarned: boolean;
    tierUpgrades: boolean;
  };
}

/**
 * Check if a notification should be shown based on user preferences
 */
export const shouldShowNotification = (
  notification: Omit<Notification, "id" | "read" | "createdAt">,
  preferences: NotificationPreferences | null
): boolean => {
  // If no preferences, show all notifications (default behavior)
  if (!preferences) {
    return true;
  }

  // Map notification types to preference keys
  const typeMap: Record<Notification["type"], keyof NotificationPreferences["inApp"]> = {
    order: "orderUpdates",
    points: "pointsEarned",
    promotion: "promotions",
    system: "orderUpdates", // System notifications treated as order updates
  };

  const preferenceKey = typeMap[notification.type] || "orderUpdates";

  // Check in-app notification preference
  return preferences.inApp[preferenceKey] !== false;
};

/**
 * Get preference key for notification type
 */
export const getPreferenceKey = (
  type: Notification["type"]
): keyof NotificationPreferences["inApp"] => {
  const typeMap: Record<Notification["type"], keyof NotificationPreferences["inApp"]> = {
    order: "orderUpdates",
    points: "pointsEarned",
    promotion: "promotions",
    system: "orderUpdates",
  };
  return typeMap[type] || "orderUpdates";
};

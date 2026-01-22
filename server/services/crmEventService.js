import CrmNotification from "../models/CrmNotification.js";

export const CRM_EVENTS = {
  CUSTOMER_TIER_CHANGED: "CUSTOMER_TIER_CHANGED",
  POINTS_EARNED: "POINTS_EARNED",
  POINTS_REDEEMED: "POINTS_REDEEMED",
  POINTS_EXPIRING: "POINTS_EXPIRING",
  CHURN_RISK_UPDATED: "CHURN_RISK_UPDATED",
  RECOMMENDATION_GENERATED: "RECOMMENDATION_GENERATED",
};

export const emitCrmEvent = async ({ type, customerId, payload = {}, io }) => {
  const notification = await CrmNotification.create({
    type,
    customerId,
    payload,
  });

  if (io) {
    io.emit("crm:notification", {
      id: notification._id,
      type,
      customerId,
      payload,
      createdAt: notification.createdAt,
    });
  }

  return notification;
};

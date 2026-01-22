import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Notification } from "../types/notification";
import { shouldShowNotification, getPreferenceKey } from "../utils/notificationHelper";

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

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  setPreferences: (preferences: NotificationPreferences) => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      preferences: null,

      setPreferences: (preferences) => {
        set({ preferences });
      },

      addNotification: (notification) => {
        // Check if notification should be shown based on preferences
        const shouldShow = shouldShowNotification(notification, get().preferences);
        
        if (!shouldShow) {
          return; // Don't add notification if user has disabled it
        }

        const preferenceKey = getPreferenceKey(notification.type);
        const pushEnabled = get().preferences?.push?.[preferenceKey];
        if (pushEnabled && typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(notification.title, {
              body: notification.message,
            });
          }
        }

        const newNotification: Notification = {
          ...notification,
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          read: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
          unreadCount: state.unreadCount + 1,
        }));
      },

      markAsRead: (id) => {
        set((state) => {
          const updated = state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          );
          return {
            notifications: updated,
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const notif = state.notifications.find((n) => n.id === id);
          const wasUnread = notif && !notif.read;
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
          };
        });
      },

      clearAll: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: "bake-ree-notifications",
    }
  )
);

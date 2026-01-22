"use client";

import { useState, useEffect, useRef } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import {
  HiBell,
  HiX,
  HiCheck,
  HiShoppingBag,
  HiGift,
  HiSparkles,
  HiCog,
} from "react-icons/hi";
import { format } from "timeago.js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <HiShoppingBag className="text-blue-500" />;
      case "points":
        return <HiGift className="text-purple-500" />;
      case "promotion":
        return <HiSparkles className="text-yellow-500" />;
      default:
        return <HiCog className="text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);

    if (notification.link) {
      router.push(notification.link);
      setIsOpen(false);
    } else if (notification.orderId) {
      router.push(`/confirmation?id=${notification.orderId}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full border border-[#e6dacb] bg-white/80 p-2 text-[#2a2927] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8f4ee]"
        aria-label="Notifications"
      >
        <HiBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c04b4b] text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 rounded-3xl border border-white/80 bg-white/95 shadow-[0_25px_60px_rgba(35,25,10,0.18)] z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#efe5d8] p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7b69]">
                Inbox
              </p>
              <h3 className="text-lg font-semibold text-[#2a2927]">
                Notifications
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => {
                    markAllAsRead();
                    toast.success("All notifications marked as read");
                  }}
                  className="text-xs font-semibold text-[#1f7a6b] hover:text-[#176158] px-2 py-1"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8b7b69] hover:text-[#1f7a6b]"
              >
                <HiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-[#8b7b69]">
                <HiBell className="text-4xl mx-auto mb-2 opacity-60" />
                <p>No notifications yet</p>
                <p className="text-sm mt-1">
                  You'll see order updates and promotions here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#efe5d8]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition cursor-pointer ${
                      !notification.read ? "bg-[#fbf7f1]" : "bg-transparent"
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? "text-[#2a2927]"
                                  : "text-[#4b4b4b]"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-xs text-[#6b6b6b] mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-[#8b7b69] mt-1">
                              {format(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#1f7a6b] rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                          toast.success("Notification removed");
                        }}
                        className="text-[#8b7b69] hover:text-[#c04b4b] transition ml-2"
                      >
                        <HiX className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-[#efe5d8]">
              <button
                onClick={() => {
                  clearAll();
                  toast.success("All notifications cleared");
                }}
                className="w-full text-sm font-semibold text-[#6b6b6b] hover:text-[#c04b4b] py-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

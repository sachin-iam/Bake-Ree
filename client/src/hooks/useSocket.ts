"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

interface UseSocketOptions {
  room?: "kitchen" | "admin" | "user";
  userId?: string;
  enabled?: boolean;
}

/**
 * Custom hook for Socket.io connection
 * @param options - Configuration options
 * @returns Socket instance and connection status
 */
export const useSocket = (options: UseSocketOptions = {}) => {
  const { room, userId, enabled = true } = options;
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Create socket connection
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    // Connection handlers
    socketInstance.on("connect", () => {
      console.log("✅ Socket.io connected:", socketInstance.id);
      setIsConnected(true);

      // Join room if specified
      if (room === "kitchen") {
        socketInstance.emit("join:kitchen");
      } else if (room === "admin") {
        socketInstance.emit("join:admin");
      } else if (room === "user" && userId) {
        socketInstance.emit("join:user", userId);
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket.io disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket.io connection error:", error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [room, userId, enabled]);

  return { socket, isConnected };
};

export default useSocket;


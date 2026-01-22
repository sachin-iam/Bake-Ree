export interface Notification {
  id: string;
  type: "order" | "points" | "promotion" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  orderId?: string;
  link?: string;
  icon?: string;
}

export type NotificationType = Notification["type"];


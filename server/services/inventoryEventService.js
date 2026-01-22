import { getIO } from "../config/socket.js";

const safeEmit = (event, payload) => {
  try {
    const io = getIO();
    io.emit(event, payload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Socket emit failed for ${event}`, error?.message || error);
    }
  }
};

export const emitLowStock = (payload) => safeEmit("LOW_STOCK_TRIGGERED", payload);
export const emitBatchExpiring = (payload) => safeEmit("BATCH_EXPIRING_SOON", payload);
export const emitGrnPosted = (payload) => safeEmit("GRN_POSTED", payload);
export const emitWasteRecorded = (payload) => safeEmit("WASTE_RECORDED", payload);

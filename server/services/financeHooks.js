export const postInventoryValuationSnapshot = async (period) => {
  return { period, status: "queued" };
};

export const postCOGS = async (period) => {
  return { period, status: "queued" };
};

export const postWasteExpense = async (period) => {
  return { period, status: "queued" };
};

export const postAPBill = async (billId) => {
  return { billId, status: "queued" };
};

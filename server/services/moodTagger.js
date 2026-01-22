export const tagMood = ({ items = [], orderTotal = 0, placedAt }) => {
  const tags = new Set();
  const lowerItems = items.map((item) => item.toLowerCase());

  const hasCake = lowerItems.some((item) => item.includes("cake"));
  const hasCandles = lowerItems.some((item) => item.includes("candle"));
  const hasCoffee = lowerItems.some((item) => item.includes("coffee"));
  const hasPastry = lowerItems.some((item) => item.includes("pastry"));
  const healthy = lowerItems.some(
    (item) => item.includes("low sugar") || item.includes("whole grain")
  );

  if (hasCake && hasCandles && orderTotal >= 50) {
    tags.add("celebration");
  }

  if (hasPastry && orderTotal >= 20 && placedAt) {
    const hour = new Date(placedAt).getHours();
    if (hour >= 19 || hour <= 6) {
      tags.add("comfort");
    }
  }

  if (healthy) {
    tags.add("healthy");
  }

  if (hasCoffee && placedAt) {
    const day = new Date(placedAt).getDay();
    const hour = new Date(placedAt).getHours();
    const isWeekday = day >= 1 && day <= 5;
    if (isWeekday && hour >= 7 && hour <= 11) {
      tags.add("work");
    }
  }

  return Array.from(tags);
};

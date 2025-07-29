/**  node migrateProductIdToProduct.js  */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// --------------------------------------------------
const uri =
  process.env.MONGO_URI ||          // ✅ tumhāre .env ka var
  process.env.MONGODB_URI ||        // fallback
  "mongodb://localhost:27017/bake-ree";

if (!uri) {
  console.error("❌ Mongo URI missing in .env"); process.exit(1);
}

// --------------------------------------------------
// Order model import — path project root se
import Order from "./server/models/Order.js";

(async () => {
  await mongoose.connect(uri);
  console.log("✅ Connected");

  const ordersToFix = await Order.find({
    "items.product":   { $exists: false },
    "items.productId": { $exists: true },
  });

  console.log(`👉 Orders needing fix: ${ordersToFix.length}`);
  let updated = 0;

  for (const order of ordersToFix) {
    order.items.forEach((it) => {
      if (!it.product && it.productId) {
        it.product = it.productId;   // copy value
      }
      delete it.productId;           // comment out if you want to keep
    });
    await order.save();
    updated++;
  }

  console.log(`🎉 Migration done — orders updated: ${updated}`);
  await mongoose.disconnect();
  process.exit(0);
})();

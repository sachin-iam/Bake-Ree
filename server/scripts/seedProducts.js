import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Butter Croissant",
    description:
      "Flaky, golden croissant baked with premium butter for a crisp outside and soft, airy inside.",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    category: "Pastries",
    stock: 120,
    isFeatured: true,
  },
  {
    name: "Classic Sourdough Loaf",
    description:
      "Naturally fermented sourdough with a tangy bite and chewy crumb, perfect for sandwiches.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=80",
    category: "Breads",
    stock: 60,
    isFeatured: true,
  },
  {
    name: "Strawberry Celebration Cake",
    description:
      "Light sponge layered with whipped cream and fresh strawberries for any special moment.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
    category: "Cakes",
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Chocolate Chip Cookies",
    description:
      "Crisp edges, gooey center, and loaded with chocolate chips for a classic indulgence.",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
    category: "Cookies",
    stock: 200,
    isFeatured: false,
  },
  {
    name: "Almond Biscotti",
    description:
      "Twice-baked almond biscotti with a satisfying crunch, ideal for coffee breaks.",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80",
    category: "Others",
    stock: 90,
    isFeatured: true,
  },
  {
    name: "Blueberry Muffin",
    description:
      "Moist muffin packed with blueberries and topped with a light sugar crumb.",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80",
    category: "Pastries",
    stock: 110,
    isFeatured: false,
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in server/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const ops = products.map((product) =>
    Product.updateOne(
      { name: product.name },
      {
        $set: {
          ...product,
          isActive: true,
          status: "active",
        },
      },
      { upsert: true }
    )
  );

  const results = await Promise.all(ops);
  const inserted = results.filter((r) => r.upsertedCount > 0).length;
  const updated = results.length - inserted;

  console.log(`Seeded products. Inserted: ${inserted}, Updated: ${updated}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Failed to seed products:", err);
  process.exitCode = 1;
});

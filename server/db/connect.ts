import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Optional: only load dotenv if not in a managed environment like Vercel
if (!process.env.MONGODB_URI) dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (globalThis as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false, // recommended for serverless
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

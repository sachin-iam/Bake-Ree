"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Optional: only load dotenv if not in a managed environment like Vercel
if (!process.env.MONGODB_URI)
    dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}
let cached = globalThis.mongoose || { conn: null, promise: null };
async function connectDB() {
    if (cached.conn)
        return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(MONGODB_URI, {
            bufferCommands: false, // recommended for serverless
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

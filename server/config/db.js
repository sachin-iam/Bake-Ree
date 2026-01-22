import mongoose from "mongoose";

mongoose.set("strictPopulate", false); // 👈 add this line at top (before connect)

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error("\n💡 Troubleshooting tips:");
    console.error("   1. Check if MongoDB Atlas cluster is running (not paused)");
    console.error("   2. Verify your IP address is whitelisted in MongoDB Atlas");
    console.error("   3. Check your network connection");
    console.error("   4. Verify MONGO_URI in .env file is correct");
    process.exit(1);
  }
};

export default connectDB;

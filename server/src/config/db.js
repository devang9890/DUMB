import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI not provided — skipping MongoDB connection (dev mode)");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Do not exit process — keep server running so frontend can be developed locally.
  }
};

export default connectDB;

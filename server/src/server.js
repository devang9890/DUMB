import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import translateRoutes from "./routes/translateRoutes.js";

dotenv.config();

const app = express();

// CORS: allow only the deployed frontend in production, allow local dev when not in production
const allowedOrigins = [process.env.CLIENT_URL || "https://dumb-bn8p.vercel.app"];
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:5173", "http://localhost:3000");
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser tools like Postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

connectDB();

// Health check for Render and monitoring
app.get("/api/health", (req, res) => {
  return res.status(200).json({ success: true, status: "ok" });
});

// root route (simple)
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.use("/api/translate", translateRoutes);

// global error handler (minimal)
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));

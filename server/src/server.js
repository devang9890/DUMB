import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import translateRoutes from "./routes/translateRoutes.js";

dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const rawAllowed = process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || "";

const allowedOrigins = rawAllowed
  .split(",")
  .map((s) => s.trim().replace(/\/$/, ""))
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.warn("No ALLOWED_ORIGINS/CLIENT_URL configured.");
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // Only allow wildcard localhost during non-production development.
      if (!isProduction && origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Allow OPTIONS preflight for all routes. Use `/*` to avoid a path-to-regexp
// parsing issue when using a single `*` which can be interpreted as a parameter.
app.options(/.*/, cors());

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

app.use("/api/translate", translateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} ✅`)
);

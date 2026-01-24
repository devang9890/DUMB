import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import translateRoutes from "./routes/translateRoutes.js";

dotenv.config();


const app = express();

// Configure CORS so that when `withCredentials: true` is used by the frontend
// the server responds with a specific Access-Control-Allow-Origin (not '*').
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow tools like Postman or server-to-server
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

app.use("/api/translate", translateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));

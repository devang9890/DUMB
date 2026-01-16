import express from "express";
import {
  translateText,
  getHistory,
  deleteHistoryItem,
  clearHistory
} from "../controllers/translateController.js";

const router = express.Router();

// translate
router.post("/", translateText);

// history
router.get("/history", getHistory);
router.delete("/clear", clearHistory);
router.delete("/:id", deleteHistoryItem);

export default router;

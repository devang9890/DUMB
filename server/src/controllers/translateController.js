import Translation from "../models/Translation.js";
import { generateTranslation } from "../services/geminiService.js";

// ✅ POST /api/translate
export const translateText = async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !mode) {
      return res.status(400).json({ message: "text and mode are required" });
    }

    const outputText = await generateTranslation(text, mode);

    const saved = await Translation.create({
      inputText: text,
      mode,
      outputText
    });

    return res.status(200).json({
      success: true,
      outputText,
      saved
    });
  } catch (error) {
    console.log("TRANSLATE ERROR ❌", error?.response?.data || error.message);

    const statusCode = error?.response?.status || 500;
    const geminiMessage =
      error?.response?.data?.error?.message || error?.response?.data?.message;
    const message = geminiMessage || error.message || "Translation failed";

    return res.status(statusCode).json({
      success: false,
      message,
      fullError: error?.response?.data || "No extra error info"
    });
  }
};

// ✅ GET /api/translate/history
export const getHistory = async (req, res) => {
  try {
    const history = await Translation.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ DELETE /api/translate/:id
export const deleteHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Translation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "History item not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      deleted
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ DELETE /api/translate/clear
export const clearHistory = async (req, res) => {
  try {
    await Translation.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All history cleared ✅"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

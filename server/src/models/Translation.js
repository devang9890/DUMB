import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    inputText: { type: String, required: true },
    mode: { type: String, required: true },
    outputText: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Translation", translationSchema);

import axios from "axios";

export const generateTranslation = async (text, mode) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured on server");
  }

  const prompt = `Rewrite the given text in "${mode}" style.\n\nRules:\n- Keep meaning same\n- Make it natural\n- Output only the rewritten text (no explanation)\n\nText: ${text}`;

  const model = "gemini-2.5-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const output = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return output;
  } catch (err) {
    const detail = err?.response?.data || err.message || "Unknown Gemini error";
    throw new Error(`Gemini request failed: ${JSON.stringify(detail)}`);
  }
};

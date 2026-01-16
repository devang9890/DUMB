import axios from "axios";

export const generateTranslation = async (text, mode) => {
  const prompt = `
Rewrite the given text in "${mode}" style.

Rules:
- Keep meaning same
- Make it natural
- Output only the rewritten text (no explanation)

Text: ${text}
`;

  // ✅ Use model from your ListModels output
  const model = "gemini-2.5-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await axios.post(url, {
    contents: [{ parts: [{ text: prompt }] }]
  });

  const output =
    response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return output;
};

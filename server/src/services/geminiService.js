import axios from "axios";

export const generateTranslation = async (text, mode) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  const prompt = `
Rewrite the given text in "${mode}" style.

Rules:
- Keep meaning same
- Make it natural
- Output only the rewritten text (no explanation)

Text: ${text}
`;

  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await axios.post(
    url,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      params: { key: apiKey },
      timeout: 20000
    }
  );

  const output =
    response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return output;
};

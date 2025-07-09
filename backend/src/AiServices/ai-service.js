const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports.main = async (promptText) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: promptText }]
            }
        ]
    });

    return response.text;
};
  
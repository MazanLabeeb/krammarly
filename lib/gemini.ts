import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCoaTZNPRHubZ4SjAf3hgeu9HbNfRiV0CY";

export async function runChat(msg: string) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  //   const safetySettings = [];

  const parts = [
    {
      text: "Remove grammar mistakes.",
    },
    {
      text: msg,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    // safetySettings,
  });

  const response = result.response;
  //   console.log(response.text());
  return response.text();
}

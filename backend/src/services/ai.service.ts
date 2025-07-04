import { config } from "../config";
import { GeminiRequest, GeminiResponse } from "../models/ai";


export class AIService {
  static async summarize(text: string): Promise<string> {
    const url = `${config.ai.url}:generateContent?key=${config.ai.geminiApiKey}`;

    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: `${config.ai.question}: ${text}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result: GeminiResponse = await response.json();

    const textSummary = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return textSummary?.replace("\n", "") ?? "";
  }
}
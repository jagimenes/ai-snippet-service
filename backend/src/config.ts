import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'snippet-service'
  },
  ai: {
    question: "Summarize in ≤ 30 words",
    url: process.env.GEMINI_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash',
    geminiApiKey: process.env.GEMINI_API_KEY || 'your-api-key'
  },
  server: {
    port: process.env.PORT || 3000
  }
};
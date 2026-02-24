// This file lives on the server, hidden from the public.
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const { studentClass, stream, level } = req.body;

  const prompt = `Generate 20 MCQ questions for Hindustan Olympiad. 
                  Class: ${studentClass}, Stream: ${stream}, Level: ${level}. 
                  Follow NCERT curriculum. Return as JSON.`;

  const result = await model.generateContent(prompt);
  res.status(200).json({ questions: result.response.text() });
}

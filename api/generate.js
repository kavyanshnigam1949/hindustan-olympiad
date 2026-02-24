const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const { studentClass, stream, level, type } = req.body;

  let prompt = "";
  if (type === "exam") {
    prompt = `Generate 20 MCQ questions for Hindustan Olympiad. 
    Class: ${studentClass}, Stream: ${stream}, Level: ${level}. 
    Follow NCERT curriculum. Include subjects like Math, Science, and Logic.
    Format: Return ONLY a JSON array: [{"q":"...","options":["A","B","C","D"],"ans":"A"}]`;
  } else {
    prompt = `Explain this concept simply for a student: ${req.body.query}`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ data: response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

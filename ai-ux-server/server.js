const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());

// ✅ Initialize OpenAI v4 style
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/analyze", async (req, res) => {
  const url = req.query.url;
  try {
    const page = await fetch(url);
    const html = await page.text();

    const prompt = `
You are a senior UI/UX expert. Analyze the HTML below and give 2–3 actionable suggestions to improve design, accessibility, or responsiveness:

${html.slice(0, 2000)}
`;

    const gptRes = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestions = gptRes.choices?.[0]?.message?.content?.trim() || "No suggestions.";
    res.json({ suggestions });
  } catch (error) {
    console.error("Analysis error:", error.message);
    res.status(500).json({ suggestions: "Error during analysis." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

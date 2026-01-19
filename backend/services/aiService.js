const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const summarize = async (articles, interests) => {
  const prompt = `
Summarize these articles focusing on ${interests.join(", ")}:
${articles.map(a => a.title).join("\n")}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};

module.exports = summarize;

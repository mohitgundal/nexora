
require("dotenv").config();

const MODEL =
  process.env.OPENROUTER_MODEL ||
  "nvidia/nemotron-3-ultra-550b-a55b:free";

async function testOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing from server/.env");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-OpenRouter-Title": "Nexora",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: "Reply with exactly: OPENROUTER_CONNECTION_OK",
          },
        ],
        max_tokens: 64,
        temperature: 0,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `OpenRouter error (${response.status}): ${
        data.error?.message || JSON.stringify(data)
      }`
    );
  }

  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error("OpenRouter returned an empty response.");
  }

  console.log("OpenRouter connection successful!");
  console.log("Model:", data.model || MODEL);
  console.log("AI response:", reply);
}

testOpenRouter().catch((error) => {
  console.error("Connection test failed:", error.message);
  process.exitCode = 1;
});

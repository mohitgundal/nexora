const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Parse JSON even if the model accidentally wraps it in Markdown.
const parseAIResponse = (content) => {
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("OpenRouter returned an empty response.");
  }

  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end <= start) {
      throw new Error("OpenRouter returned invalid JSON.");
    }

    return JSON.parse(cleaned.slice(start, end + 1));
  }
};

const processBuilderInstruction = async ({ prompt, websiteData }) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const model =
    process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing from server/.env");
  }

  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("A valid builder instruction is required.");
  }

  const supportedActions = [
    "change_headline",
    "change_description",
    "change_brand",
    "change_primary_button",
    "change_secondary_button",
    "add_feature",
    "remove_feature",
    "add_navigation",
    "change_theme",
    "change_primary_color",
    "change_layout_style",
    "change_spacing",
    "change_card_style",
    "unsupported",
  ];

  const systemPrompt = `
You are Nexora AI, an expert AI website builder.

Convert the user's natural-language instructions into structured website actions.

RULES:
1. Identify every explicitly requested modification.
2. Return a separate action for each modification.
3. Preserve the order of the user's instructions.
4. Do not invent additional modifications.
5. Do not modify properties the user did not request.
6. Return a maximum of 6 actions.
7. If the request is unsupported, return one unsupported action.
8. Return valid JSON only. No Markdown or explanations outside JSON.

SUPPORTED ACTIONS:
${supportedActions.join(", ")}

ACTION VALUE RULES:
- change_theme: "dark" or "light".
- change_primary_color: valid CSS color, preferably HEX.
- change_layout_style: "modern", "minimalist", "saas", or "editorial".
- change_spacing: "compact", "comfortable", or "spacious".
- change_card_style: "rounded", "sharp", or "glass".

RESPONSE FORMAT:
{
  "actions": [
    {
      "action": "change_headline",
      "value": "Your new headline"
    }
  ],
  "message": "Brief description of the requested changes."
}

For unsupported requests, return:
{
  "actions": [
    {
      "action": "unsupported",
      "value": ""
    }
  ],
  "message": "This modification is not supported yet."
}
`;

  const userPrompt = `
CURRENT WEBSITE DATA:
${JSON.stringify(websiteData || {}, null, 2)}

USER INSTRUCTION:
${prompt}
`;

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-OpenRouter-Title": "Nexora",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 1200,
      temperature: 0.1,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const providerMessage = data.error?.message || "Unknown OpenRouter error";

    throw new Error(
      `OpenRouter API error (${response.status}): ${providerMessage}`,
    );
  }

  const choice = data.choices?.[0];

  if (!choice) {
    throw new Error("OpenRouter did not return a response choice.");
  }

  if (choice.finish_reason === "length") {
    throw new Error("OpenRouter response reached its token limit.");
  }

  const result = parseAIResponse(choice.message?.content);

  if (
    !result ||
    !Array.isArray(result.actions) ||
    typeof result.message !== "string"
  ) {
    throw new Error("OpenRouter returned an invalid Builder response.");
  }

  if (result.actions.length === 0 || result.actions.length > 6) {
    throw new Error("OpenRouter returned an invalid number of actions.");
  }

  for (const action of result.actions) {
    if (
      !action ||
      !supportedActions.includes(action.action) ||
      typeof action.value !== "string"
    ) {
      throw new Error("OpenRouter returned an unsupported Builder action.");
    }
  }

  return {
    message: result.message,
    actions: result.actions,
  };
};

module.exports = {
  processBuilderInstruction,
};

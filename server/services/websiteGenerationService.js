const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const getProjectContext = (project, requirements, plan) => {
  return JSON.stringify(
    {
      project: {
        name: project.name,
        type: project.type,
        goal: project.goal,
      },
      requirements,
      plan,
    },
    null,
    2,
  ).slice(0, 10000);
};

// Generate one source file using OpenRouter.
const generateSourceFile = async ({
  context,
  filePath,
  instructions,
  maxTokens = 4096,
  reasoning = null,
}) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const model =
    process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing from server/.env");
  }

  const prompt = `
You are Nexora AI, an expert React website generator.

PROJECT CONTEXT:
${context}

FILE TO GENERATE:
${filePath}

INSTRUCTIONS:
${instructions}

GENERAL RULES:
- Return only valid source code.
- Do not use Markdown code fences.
- Use JavaScript and JSX, not TypeScript.
- Use regular CSS class names.
- Do not use Tailwind.
- Do not use external libraries.
- Do not use Lorem Ipsum.
- Do not leave TODO comments.
- Write concise, complete, functional code.
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
          role: "user",
          content: prompt,
        },
      ],

      max_tokens: maxTokens,
      temperature: 0.2,

      ...(reasoning ? { reasoning } : {}),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const providerMessage = data.error?.message || JSON.stringify(data);

    throw new Error(
      `OpenRouter API error (${response.status}): ${providerMessage}`,
    );
  }

  const choice = data.choices?.[0];

  const finishReason = choice?.finish_reason || "unknown";

  const messageContent = choice?.message?.content;

  console.log("========== OPENROUTER RESPONSE DEBUG ==========");

  console.log("File:", filePath);
  console.log("Model:", data.model || model);
  console.log("Finish reason:", finishReason);
  console.log("Usage:", data.usage);

  console.log(
    "Response text length:",
    typeof messageContent === "string" ? messageContent.length : 0,
  );

  console.log("===============================================");

  if (finishReason === "length") {
    throw new Error(
      `OpenRouter reached the token limit while generating ${filePath}.`,
    );
  }

  if (typeof messageContent !== "string" || !messageContent.trim()) {
    throw new Error(
      `OpenRouter returned an empty response for ${filePath}. Finish reason: ${finishReason}`,
    );
  }

  // Remove accidental Markdown code fences.
  const cleanedCode = messageContent
    .trim()
    .replace(/^```(?:jsx|javascript|css)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  if (!cleanedCode) {
    throw new Error(`Generated source code is empty for ${filePath}.`);
  }

  return cleanedCode;
};

// Generate the complete React website project.
const generateWebsiteProject = async ({
  project,
  requirements,
  plan,
  onProgress = async () => {},
}) => {
  const reportProgress = async (event) => {
    await onProgress({
      ...event,
      updatedAt: new Date(),
    });
  };

  // STEP 1: Analyze project requirements.
  await reportProgress({
    step: 1,
    stage: "analyzing_requirements",
    message: "Analyzing project requirements",
    status: "started",
  });

  if (!requirements || !plan) {
    throw new Error("Project requirements or website plan are missing.");
  }

  const context = getProjectContext(project, requirements, plan);

  await reportProgress({
    step: 1,
    stage: "analyzing_requirements",
    message: "Project requirements analyzed successfully",
    status: "completed",
  });

  // STEP 2: Prepare website structure.
  await reportProgress({
    step: 2,
    stage: "preparing_structure",
    message: "Preparing website component structure",
    status: "started",
  });

  const componentSpecifications = [
    {
      filePath: "src/components/Navbar.jsx",
      name: "navigation",
      instructions: `
Create a responsive website navigation component.

Requirements:
- Export a default React component named Navbar.
- Include the project or brand name.
- Include relevant navigation links based on the project.
- Include a prominent call-to-action button.
- Use semantic navigation markup.
- Keep the component concise, around 60-100 lines.
- Do not import other local components.
`,
    },
    {
      filePath: "src/components/Hero.jsx",
      name: "hero section",
      instructions: `
Create an attractive, professional website hero component.

Requirements:
- Export a default React component named Hero.
- Create a compelling headline based on the project goal.
- Include supporting descriptive text.
- Include relevant call-to-action buttons.
- Use a polished layout and visual hierarchy.
- Keep the component concise, around 70-120 lines.
- Do not import other local components.
`,
    },
    {
      filePath: "src/components/Sections.jsx",
      name: "website content sections",
      instructions: `
Create the main content sections for this website.

Requirements:
- Export a default React component named Sections.
- Include the most relevant sections from the website plan.
- Use reusable data arrays and map() where appropriate.
- Include features, services, benefits, products or other relevant content.
- Use realistic content based on the project.
- Keep the component concise, around 100-150 lines.
- Do not create another navigation, hero or footer.
- Do not import other local components.
`,
    },
    {
      filePath: "src/components/Footer.jsx",
      name: "website footer",
      instructions: `
Create a professional website footer.

Requirements:
- Export a default React component named Footer.
- Include the project or brand name.
- Include relevant footer navigation links.
- Include a short brand description.
- Include a copyright notice.
- Keep the component concise, around 50-80 lines.
- Do not import other local components.
`,
    },
  ];

  await reportProgress({
    step: 2,
    stage: "preparing_structure",
    message: "Website component specifications prepared",
    status: "completed",
  });

  // STEP 3: Generate React components.
  const componentCodes = {};

  for (const specification of componentSpecifications) {
    await reportProgress({
      step: 3,
      stage: "generating_components",
      message: `Generating ${specification.name}`,
      status: "started",
      filePath: specification.filePath,
    });

    console.log(`Nexora: Generating ${specification.filePath}`);

    const generatedCode = await generateSourceFile({
      context,
      filePath: specification.filePath,
      instructions: specification.instructions,
    });

    componentCodes[specification.filePath] = generatedCode;

    await reportProgress({
      step: 3,
      stage: "generating_components",
      message: `Successfully generated ${specification.name}`,
      status: "file_completed",
      filePath: specification.filePath,
    });
  }

  const navbarCode = componentCodes["src/components/Navbar.jsx"];

  const heroCode = componentCodes["src/components/Hero.jsx"];

  const sectionsCode = componentCodes["src/components/Sections.jsx"];

  const footerCode = componentCodes["src/components/Footer.jsx"];

  await reportProgress({
    step: 3,
    stage: "generating_components",
    message: "All four website components generated",
    status: "completed",
  });

  // STEP 4: Generate global CSS.
  await reportProgress({
    step: 4,
    stage: "generating_styles",
    message: "Preparing global stylesheet",
    status: "started",
  });

  // Extract CSS class names from generated components.
  const extractClassNames = (code) => {
    const matches = [
      ...code.matchAll(/className=["']([^"']+)["']/g),
      ...code.matchAll(/className=\{`([^`]+)`\}/g),
    ];

    return matches
      .flatMap((match) => match[1].split(/\s+/))
      .filter((name) => name && !name.includes("${"));
  };

  const classNames = [
    ...new Set([
      ...extractClassNames(navbarCode),
      ...extractClassNames(heroCode),
      ...extractClassNames(sectionsCode),
      ...extractClassNames(footerCode),
    ]),
  ];

  const cssContext = JSON.stringify({
    projectContext: JSON.parse(context),
    componentClassNames: classNames,
  });

  await reportProgress({
    step: 4,
    stage: "generating_styles",
    message: "Generating responsive global CSS",
    status: "started",
    filePath: "src/index.css",
  });

  const cssCode = await generateSourceFile({
    context: cssContext,
    filePath: "src/index.css",
    maxTokens: 5000,

    reasoning: {
      effort: "none",
    },

    instructions: `
Generate a compact, complete global CSS stylesheet.

Use the supplied componentClassNames to style the actual React components.
Do not invent class names or attempt to reproduce the JSX.

Requirements:
- Global box-sizing reset and body defaults.
- CSS variables for colors, typography and spacing.
- Navigation and responsive mobile layout.
- Hero heading, description and buttons.
- Main sections and reusable cards.
- Footer layout.
- Tablet and mobile media queries.

Rules:
- Maximum 45 lines.
- Regular CSS only.
- No Tailwind, external libraries or animations.
- No comments or duplicate selectors.
- Use concise declarations.
- Every CSS rule must have balanced braces.
- Return only complete CSS source code.
`,
  });

  // Validate generated CSS.
  const cssOpenBraces = (cssCode.match(/{/g) || []).length;

  const cssCloseBraces = (cssCode.match(/}/g) || []).length;

  if (cssOpenBraces !== cssCloseBraces) {
    throw new Error("Generated CSS contains unbalanced braces.");
  }

  if (!cssCode.includes("body") || !cssCode.includes("box-sizing")) {
    throw new Error("Generated CSS is missing required global styles.");
  }

  await reportProgress({
    step: 4,
    stage: "generating_styles",
    message: "Global stylesheet generated and validated",
    status: "completed",
  });

  // STEP 5: Assemble React application.
  await reportProgress({
    step: 5,
    stage: "assembling_application",
    message: "Assembling React application",
    status: "started",
  });

  // Create the application entry component ourselves.
  const appCode = `
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Sections from "./components/Sections.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />
    </>
  );
}

export default App;
`.trim();

  // Create the React entry point ourselves.
  const mainCode = `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`.trim();

  const generatedProject = {
    message: "Website generated successfully",
    entryFile: "src/App.jsx",

    files: [
      {
        path: "src/main.jsx",
        content: mainCode,
      },
      {
        path: "src/App.jsx",
        content: appCode,
      },
      {
        path: "src/components/Navbar.jsx",
        content: navbarCode,
      },
      {
        path: "src/components/Hero.jsx",
        content: heroCode,
      },
      {
        path: "src/components/Sections.jsx",
        content: sectionsCode,
      },
      {
        path: "src/components/Footer.jsx",
        content: footerCode,
      },
      {
        path: "src/index.css",
        content: cssCode,
      },
    ],
  };

  await reportProgress({
    step: 5,
    stage: "assembling_application",
    message: "React application files assembled",
    status: "completed",
  });

  // STEP 6: Validate complete generated project.
  await reportProgress({
    step: 6,
    stage: "validating_project",
    message: "Validating generated project files",
    status: "started",
  });

  const allowedPath = /^src\/[a-zA-Z0-9_./-]+$/;

  const filePaths = new Set();

  let totalSize = 0;

  for (const file of generatedProject.files) {
    if (
      typeof file.path !== "string" ||
      typeof file.content !== "string" ||
      !file.content.trim()
    ) {
      throw new Error("Generated project contains an invalid file.");
    }

    if (
      !allowedPath.test(file.path) ||
      file.path.includes("..") ||
      file.path.includes("\\")
    ) {
      throw new Error(`Invalid generated file path: ${file.path}`);
    }

    if (filePaths.has(file.path)) {
      throw new Error(`Duplicate generated file: ${file.path}`);
    }

    if (file.content.length > 25000) {
      throw new Error(`Generated file is too large: ${file.path}`);
    }

    filePaths.add(file.path);

    totalSize += file.content.length;
  }

  if (totalSize > 100000) {
    throw new Error("Generated project exceeds the allowed size.");
  }

  if (!filePaths.has("src/App.jsx")) {
    throw new Error("Generated project is missing src/App.jsx.");
  }

  if (!filePaths.has("src/main.jsx")) {
    throw new Error("Generated project is missing src/main.jsx.");
  }

  await reportProgress({
    step: 6,
    stage: "validating_project",
    message: "All generated project files validated successfully",
    status: "completed",
  });

  console.log(
    `Nexora: Successfully generated ${generatedProject.files.length} files.`,
  );

  return generatedProject;
};

module.exports = {
  generateWebsiteProject,
};

import React, { useMemo } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import AIChat from "./AIChat";
import CodeEditor from "./CodeEditor";
import LivePreview from "./LivePreview";
import VersionHistory from "./VersionHistory";
import FileExplorer from "./FileExplorer";

const normalizePath = (path) => {
  return String(path || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
};

const createSandpackFiles = (files) => {
  const sandpackFiles = {};

  files.forEach((file) => {
    const path = normalizePath(file.path);

    if (typeof file.content !== "string") return;

    // Include frontend source files, public assets and project configuration.
    const isFrontendFile =
      path.startsWith("src/") ||
      path.startsWith("public/") ||
      path === "package.json" ||
      path === "index.html";

    if (!isFrontendFile) return;

    // Do not expose environment files or secrets in the browser preview.
    if (path === ".env" || path.startsWith(".env.")) return;

    sandpackFiles[`/${path}`] = {
      code: file.content,
      readOnly: false,
    };
  });

  // Sandpack's React template uses src/index.js as its entry point.
  // Reuse the generated main.jsx when it exists.
  if (sandpackFiles["/src/main.jsx"]) {
    sandpackFiles["/src/index.js"] = {
      code: sandpackFiles["/src/main.jsx"].code,
      readOnly: false,
    };
  }

  // If the generated project has App.jsx but no entry file, create one.
  if (!sandpackFiles["/src/index.js"] && sandpackFiles["/src/App.jsx"]) {
    sandpackFiles["/src/index.js"] = {
      code: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
      readOnly: false,
    };
  }

  return sandpackFiles;
};

const BuilderWorkspace = ({
  project,
  requirements,
  websiteData,
  activeView,
  saveStatus,
  code,
  onCodeChange,
  versions,
  onAIAction,
  onRestoreVersion,
  files = [],
  activeFile = "",
  onSelectFile = () => {},
}) => {
  const sandpackFiles = useMemo(() => createSandpackFiles(files), [files]);

  return (
    <SandpackProvider
      template="react"
      files={sandpackFiles}
      customSetup={{
        entry: "/src/index.js",
      }}
      options={{
        bundlerURL: "https://sandpack-bundler.codesandbox.io",
        activeFile: activeFile
          ? `/${normalizePath(activeFile)}`
          : "/src/App.jsx",
        visibleFiles: Object.keys(sandpackFiles),
        readOnly: false,
        showReadOnly: false,
        recompileMode: "delayed",
        recompileDelay: 500,
      }}
    >
      <div className="grid h-full min-h-0 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* AI Chat / Version History */}
        <div className="hidden min-h-0 lg:block">
          {activeView === "history" ? (
            <VersionHistory
              versions={versions}
              onRestoreVersion={onRestoreVersion}
            />
          ) : (
            <AIChat project={project} onAIAction={onAIAction} />
          )}
        </div>

        {/* Explorer, Editor and Preview */}
        <div className="grid h-full min-h-0 min-w-0 lg:grid-cols-[200px_minmax(0,1fr)]">
          <div className="hidden min-h-0 lg:block">
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onSelectFile={onSelectFile}
            />
          </div>

          <div className="grid h-full min-h-0 min-w-0 lg:grid-rows-[minmax(110px,0.65fr)_minmax(0,1.8fr)]">
            {/* Code Editor */}
            <div className="min-h-0 min-w-0 border-b border-white/10">
              <CodeEditor
                code={code}
                onChange={onCodeChange}
                activeFile={activeFile}
                saveStatus={saveStatus}
              />
            </div>

            {/* Live Preview */}
            <div className="min-h-0 min-w-0 overflow-hidden">
              <LivePreview files={files} />
            </div>
          </div>
        </div>
      </div>
    </SandpackProvider>
  );
};

export default BuilderWorkspace;

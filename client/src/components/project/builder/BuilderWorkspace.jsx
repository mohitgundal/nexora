import React, { useMemo, useState } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import {
  FileCode2,
  FolderOpen,
  History,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

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

    const isFrontendFile =
      path.startsWith("src/") ||
      path.startsWith("public/") ||
      path === "package.json" ||
      path === "index.html";

    if (!isFrontendFile) return;
    if (path === ".env" || path.startsWith(".env.")) return;

    sandpackFiles[`/${path}`] = {
      code: file.content,
      readOnly: false,
    };
  });

  if (sandpackFiles["/src/main.jsx"]) {
    sandpackFiles["/src/index.js"] = {
      code: sandpackFiles["/src/main.jsx"].code,
      readOnly: false,
    };
  }

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
  conversations = [],
  activeConversation,
  onSelectConversation,
  onNewConversation,
  onConversationMessagesChange,
  chatOpen,
  onToggleChat,
}) => {
  const [codeSidebarView, setCodeSidebarView] = useState("files");

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
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#08080a]">
        {/* MAIN WORKSPACE */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* BUILD MODE — RESPONSIVE */}
          {activeView === "build" && (
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:flex-row">
              {/* FULL-SIZE WEBSITE PREVIEW */}
              <main className="relative order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#08090d] lg:order-2">
                <div className="flex min-h-0 flex-1 overflow-hidden">
                  <LivePreview files={files} />
                </div>
              </main>

              {/* AI CHAT — DESKTOP SIDEBAR / MOBILE BOTTOM COMPOSER */}
              <aside
                className={`order-2 flex max-h-[88px] w-full shrink-0 flex-col overflow-hidden border-t border-white/10 bg-[#0d0d10] lg:order-1 lg:max-h-none lg:border-r lg:border-t-0 ${
                  chatOpen ? "lg:flex lg:w-[360px]" : "lg:hidden lg:w-0"
                }`}
              >
                <AIChat
                  project={project}
                  conversation={activeConversation}
                  onMessagesChange={onConversationMessagesChange}
                  onAIAction={onAIAction}
                />
              </aside>
            </div>
          )}

          {/* CODE MODE */}
          {activeView === "code" && (
            <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
              <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Code workspace
                  </h2>
                  <p className="mt-1 text-[11px] text-white/35">
                    Inspect and edit your generated project files
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => setCodeSidebarView("files")}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] ${
                      codeSidebarView === "files"
                        ? "bg-white text-black"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <FolderOpen size={13} />
                    Files
                  </button>

                  <button
                    type="button"
                    onClick={() => setCodeSidebarView("versions")}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] ${
                      codeSidebarView === "versions"
                        ? "bg-white text-black"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <History size={13} />
                    Versions
                  </button>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 lg:grid-cols-[230px_minmax(0,1fr)]">
                <aside className="hidden min-h-0 border-r border-white/10 bg-[#0d0d10] sm:block">
                  {codeSidebarView === "files" ? (
                    <FileExplorer
                      files={files}
                      activeFile={activeFile}
                      onSelectFile={onSelectFile}
                    />
                  ) : (
                    <VersionHistory
                      versions={versions}
                      onRestoreVersion={onRestoreVersion}
                    />
                  )}
                </aside>

                <div className="min-h-0 min-w-0 overflow-hidden">
                  <CodeEditor
                    code={code}
                    onChange={onCodeChange}
                    activeFile={activeFile}
                    saveStatus={saveStatus}
                  />
                </div>
              </div>

              {/* Mobile file / version selector */}
              <div className="mt-2 flex gap-2 sm:hidden">
                {files.map((file) => (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => onSelectFile(file.path)}
                    className={`max-w-[48%] truncate rounded-lg border px-3 py-2 text-[10px] ${
                      activeFile === file.path
                        ? "border-purple-400/40 bg-purple-400/10 text-purple-200"
                        : "border-white/10 text-white/50"
                    }`}
                  >
                    <FileCode2 size={11} className="mr-1 inline" />
                    {file.path.split("/").pop()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SandpackProvider>
  );
};

export default BuilderWorkspace;

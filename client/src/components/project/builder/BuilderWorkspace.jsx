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
  ChevronDown,
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
  const [isMobileFileMenuOpen, setIsMobileFileMenuOpen] = useState(false);

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
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* BUILD MODE — RESPONSIVE */}
          <section
            aria-hidden={activeView !== "build"}
            className={`absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden transition-opacity duration-150 lg:flex-row ${
              activeView === "build"
                ? "z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
          >
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
          </section>

          {/* CODE MODE */}
          <section
            aria-hidden={activeView !== "code"}
            className={`absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden p-3 sm:p-4 transition-opacity duration-150 ${
              activeView === "code"
                ? "z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
          >
            {/* CODE HEADER */}
            <div className="relative z-30 mb-3 flex shrink-0 items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Code workspace
                </h2>
                <p className="mt-1 text-[11px] text-white/35">
                  Inspect and edit your generated project files
                </p>
              </div>

              {/* FILES / VERSIONS BUTTONS */}
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                {/* FILES BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setCodeSidebarView("files");
                    setIsMobileFileMenuOpen((previous) => !previous);
                  }}
                  aria-expanded={isMobileFileMenuOpen}
                  aria-label="Open project files"
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] ${
                    codeSidebarView === "files"
                      ? "bg-white text-black"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <FolderOpen size={13} />
                  Files
                  <ChevronDown
                    size={12}
                    className={`transition-transform sm:hidden ${
                      isMobileFileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* VERSIONS BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setCodeSidebarView("versions");
                    setIsMobileFileMenuOpen(false);
                  }}
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

              {/* MOBILE PROJECT FILE DROPDOWN */}
              {isMobileFileMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/50 sm:hidden">
                  {/* DROPDOWN HEADER */}
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
                    <span className="text-xs font-semibold text-white/80">
                      Project files
                    </span>

                    <span className="text-[10px] text-white/40">
                      {files.length} files
                    </span>
                  </div>

                  {/* FILE LIST */}
                  <div className="max-h-[55vh] overflow-y-auto p-2">
                    {files.length > 0 ? (
                      files.map((file) => {
                        const isActive = activeFile === file.path;
                        const fileName = file.path.split("/").pop();

                        return (
                          <button
                            key={file.path}
                            type="button"
                            onClick={() => {
                              onSelectFile(file.path);
                              setIsMobileFileMenuOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                              isActive
                                ? "bg-purple-500/15 text-purple-200"
                                : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                            }`}
                          >
                            <FileCode2
                              size={16}
                              className="shrink-0 text-purple-300"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium">
                                {fileName}
                              </p>

                              <p className="mt-1 truncate text-[10px] text-white/35">
                                {file.path}
                              </p>
                            </div>

                            {isActive && (
                              <span className="size-2 shrink-0 rounded-full bg-purple-400" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-3 py-6 text-center text-xs text-white/40">
                        No project files available.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* EDITOR AND DESKTOP SIDEBAR */}
            <div className="grid min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 lg:grid-cols-[230px_minmax(0,1fr)]">
              {/* DESKTOP FILE EXPLORER / VERSION HISTORY */}
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

              {/* EXISTING CODE EDITOR — UNCHANGED */}
              <div className="min-h-0 min-w-0 overflow-hidden">
                <CodeEditor
                  code={code}
                  onChange={onCodeChange}
                  activeFile={activeFile}
                  saveStatus={saveStatus}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </SandpackProvider>
  );
};

export default BuilderWorkspace;

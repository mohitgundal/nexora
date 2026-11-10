import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileText,
  Folder,
} from "lucide-react";

const FileExplorer = ({ files = [], activeFile, onSelectFile }) => {
  const [isMobileSelectorOpen, setIsMobileSelectorOpen] = useState(false);

  const activeFileData = files.find((file) => file.path === activeFile);

  const activeFileName = activeFile
    ? activeFile.split("/").pop()
    : "Select a file";

  const activeFilePath = activeFile
    ? activeFile.split("/").filter(Boolean)
    : [];

  const handleFileSelect = (filePath) => {
    onSelectFile(filePath);
    setIsMobileSelectorOpen(false);
  };

  const getFileIcon = (filePath) => {
    return filePath.endsWith(".css") ? (
      <FileText className="size-4 shrink-0 text-blue-300" />
    ) : (
      <FileCode2 className="size-4 shrink-0 text-purple-300" />
    );
  };

  return (
    <>
      {/* Mobile File Selector */}
      <div className="relative z-20 w-full shrink-0 border-b border-white/10 bg-[#09090b] md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileSelectorOpen((previous) => !previous)}
          aria-expanded={isMobileSelectorOpen}
          aria-label="Select project file"
          className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 transition hover:bg-white/[0.04]"
        >
          <div className="flex min-w-0 items-center gap-2">
            <Folder className="size-4 shrink-0 text-purple-300" />

            <div className="flex min-w-0 items-center gap-1.5 overflow-hidden text-xs">
              {activeFilePath.length > 0 ? (
                activeFilePath.map((segment, index) => (
                  <React.Fragment key={`${segment}-${index}`}>
                    {index > 0 && (
                      <ChevronRight className="size-3 shrink-0 text-white/25" />
                    )}

                    <span
                      className={
                        index === activeFilePath.length - 1
                          ? "truncate font-medium text-white/85"
                          : "shrink-0 text-white/40"
                      }
                    >
                      {segment}
                    </span>
                  </React.Fragment>
                ))
              ) : (
                <span className="text-white/50">Select a file</span>
              )}
            </div>
          </div>

          <ChevronDown
            className={`size-4 shrink-0 text-white/50 transition-transform ${
              isMobileSelectorOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile File Dropdown */}
        {isMobileSelectorOpen && (
          <div className="absolute left-2 right-2 top-full z-50 mt-1 max-h-[55vh] overflow-y-auto rounded-xl border border-white/10 bg-[#111114] p-2 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 px-2 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Project files
              </span>

              <span className="text-[10px] text-white/30">
                {files.length} files
              </span>
            </div>

            {files.length > 0 ? (
              <div className="mt-1 space-y-1">
                {files.map((file) => {
                  const isActive = activeFile === file.path;

                  return (
                    <button
                      key={file.path}
                      type="button"
                      onClick={() => handleFileSelect(file.path)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                        isActive
                          ? "bg-purple-500/15 text-purple-200"
                          : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {getFileIcon(file.path)}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {file.path.split("/").pop()}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-white/30">
                          {file.path}
                        </p>
                      </div>

                      {isActive && (
                        <span className="size-1.5 shrink-0 rounded-full bg-purple-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="px-3 py-5 text-center text-xs text-white/40">
                No generated files found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Desktop File Explorer */}
      <aside className="hidden h-full min-h-0 flex-col border-r border-white/10 bg-[#09090b] md:flex">
        <div className="border-b border-white/10 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Explorer
          </span>
        </div>

        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <ChevronRight className="size-3 text-white/40" />
          <Folder className="size-4 text-purple-300" />

          <span className="text-xs font-medium text-white/70">src</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {files.length > 0 ? (
            files.map((file) => {
              const fileName = file.path.split("/").pop();
              const isActive = activeFile === file.path;

              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => handleFileSelect(file.path)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
                    isActive
                      ? "bg-purple-500/15 text-purple-200"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {getFileIcon(file.path)}

                  <span className="truncate">{fileName}</span>
                </button>
              );
            })
          ) : (
            <p className="p-4 text-xs text-white/30">
              No generated files found.
            </p>
          )}
        </div>

        <div className="border-t border-white/10 px-4 py-3">
          <span className="text-[10px] text-white/30">
            {files.length} files
          </span>
        </div>
      </aside>
    </>
  );
};

export default FileExplorer;

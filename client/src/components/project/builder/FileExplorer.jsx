import React from "react";
import { ChevronRight, FileCode2, FileText, Folder } from "lucide-react";

const FileExplorer = ({ files = [], activeFile, onSelectFile }) => {
  if (!files.length) {
    return (
      <aside className="flex h-full flex-col border-r border-white/10 bg-[#09090b]">
        <div className="border-b border-white/10 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Explorer
          </span>
        </div>

        <p className="p-4 text-xs text-white/30">No generated files found.</p>
      </aside>
    );
  }

  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-white/10 bg-[#09090b]">
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
        {files.map((file) => {
          const fileName = file.path.split("/").pop();
          const isActive = activeFile === file.path;
          const isCSS = file.path.endsWith(".css");

          return (
            <button
              key={file.path}
              type="button"
              onClick={() => onSelectFile(file.path)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
                isActive
                  ? "bg-purple-500/15 text-purple-200"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isCSS ? (
                <FileText className="size-4 shrink-0" />
              ) : (
                <FileCode2 className="size-4 shrink-0" />
              )}

              <span className="truncate">{fileName}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <span className="text-[10px] text-white/30">{files.length} files</span>
      </div>
    </aside>
  );
};

export default FileExplorer;

import React from "react";
import {
  ArrowLeft,
  Cloud,
  Code2,
  Eye,
  MessageSquare,
  Rocket,
} from "lucide-react";

const BuilderHeader = ({
  project,
  activeView,
  setActiveView,
  saveStatus = "saved",
  onBack,
  onDeploy,
  onToggleChat,
}) => {
  const saveLabels = {
    saved: "All changes saved",
    unsaved: "Unsaved changes",
    saving: "Saving changes...",
    error: "Save failed",
  };

  const saveColor =
    saveStatus === "error"
      ? "text-red-400"
      : saveStatus === "saved"
        ? "text-green-400"
        : "text-amber-400";

  const tabClasses = (isActive) =>
    `inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition sm:px-3 ${
      isActive ? "bg-white text-black" : "text-white/50 hover:text-white"
    }`;

  return (
    <header className="relative z-30 flex min-h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#08080a] px-2.5 sm:min-h-16 sm:gap-3 sm:px-5">
      {/* Left: Back, project name and history */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3">
        <button
          type="button"
          onClick={onBack}
          title="Back to project"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/55 transition hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>

        {/* AI Chat Toggle — Desktop only */}
        <button
          type="button"
          onClick={onToggleChat}
          title="Toggle AI chat"
          aria-label="Toggle AI chat"
          className="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/55 transition hover:bg-white/[0.06] hover:text-white lg:flex"
        >
          <MessageSquare size={17} />
        </button>

        <div className="min-w-0">
          <p className="max-w-[100px] truncate text-xs font-medium text-white sm:max-w-[150px] sm:text-sm lg:max-w-none">
            {project?.name || "Untitled Project"}
          </p>

          <div className="mt-0.5 hidden items-center gap-1.5 sm:flex">
            <Cloud size={12} className={saveColor} />

            <span className="truncate text-xs text-white/40">
              {saveLabels[saveStatus] || "Project workspace"}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Preview / Code */}
      <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] p-1">
        <button
          type="button"
          onClick={() => setActiveView("build")}
          className={tabClasses(activeView === "build")}
        >
          <Eye size={14} />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("code")}
          className={tabClasses(activeView === "code")}
        >
          <Code2 size={14} />
          <span>Code</span>
        </button>
      </div>

      {/* Right: Deploy */}
      <button
        type="button"
        onClick={onDeploy}
        title="Deploy project"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-gray-200 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5"
      >
        <Rocket size={15} />
        <span className="hidden text-xs font-semibold sm:inline">Deploy</span>
      </button>
    </header>
  );
};

export default BuilderHeader;

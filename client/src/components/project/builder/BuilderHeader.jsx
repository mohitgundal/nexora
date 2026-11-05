import React from "react";
import {
  ArrowLeft,
  Cloud,
  Eye,
  History,
  Rocket,
} from "lucide-react";

const BuilderHeader = ({
  project,
  activeView,
  setActiveView,
  onBack,
  onDeploy,
}) => {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#08080a] px-4 sm:px-6">
      
      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
          title="Back"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {project.name}
          </p>

          <div className="mt-0.5 flex items-center gap-1.5">
            <Cloud className="size-3 text-green-400" />

            <span className="text-xs text-white/35">
              Saved locally
            </span>
          </div>
        </div>
      </div>

      {/* Center Navigation */}
      <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 md:flex">
        <button
          type="button"
          onClick={() => setActiveView("preview")}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
            activeView === "preview"
              ? "bg-white text-black"
              : "text-white/45 hover:text-white"
          }`}
        >
          <Eye className="size-3.5" />
          Preview
        </button>

        <button
          type="button"
          onClick={() => setActiveView("history")}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
            activeView === "history"
              ? "bg-white text-black"
              : "text-white/45 hover:text-white"
          }`}
        >
          <History className="size-3.5" />
          History
        </button>
      </div>

      {/* Right */}
      <button
        type="button"
        onClick={onDeploy}
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
      >
        <Rocket className="size-3.5" />

        <span className="hidden sm:inline">
          Deploy
        </span>
      </button>

    </header>
  );
};

export default BuilderHeader;
import React from "react";
import {
  MessageSquare,
  Code2,
  Eye,
  Sparkles,
} from "lucide-react";

const WorkspaceCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-green-500/10 blur-3xl transition duration-500 group-hover:bg-green-500/20" />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          05
        </span>

        <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs text-green-300">
          WORKSPACE
        </span>
      </div>

      <h3 className="relative mt-8 text-2xl font-semibold">
        Build and refine
      </h3>

      <p className="relative mt-3 leading-7 text-white/50">
        Continue working on your generated website using AI
        chat, a code editor, and an integrated live preview.
      </p>

      {/* Builder Workspace Visual */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/40">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-purple-300" />

            <span className="text-[10px] text-white/60">
              Nexora workspace
            </span>
          </div>

          <span className="size-2 rounded-full bg-green-400" />
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-3 gap-2 p-3">
          {/* AI Chat */}
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <MessageSquare className="size-4 text-purple-300" />

            <p className="mt-3 text-[9px] font-medium text-white/70">
              AI Chat
            </p>

            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded bg-purple-400/20" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-full rounded bg-white/10" />
            </div>
          </div>

          {/* Code Editor */}
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <Code2 className="size-4 text-blue-300" />

            <p className="mt-3 text-[9px] font-medium text-white/70">
              Code
            </p>

            <div className="mt-3 space-y-2">
              <div className="h-1.5 w-3/4 rounded bg-purple-400/40" />
              <div className="h-1.5 w-full rounded bg-blue-400/30" />
              <div className="h-1.5 w-2/3 rounded bg-white/20" />
              <div className="h-1.5 w-3/4 rounded bg-purple-400/20" />
            </div>
          </div>

          {/* Live Preview */}
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <Eye className="size-4 text-green-300" />

            <p className="mt-3 text-[9px] font-medium text-white/70">
              Preview
            </p>

            <div className="mt-3 space-y-2">
              <div className="h-3 rounded bg-purple-400/30" />
              <div className="h-2 w-3/4 rounded bg-white/20" />
              <div className="h-6 rounded bg-white/[0.06]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-green-400/[0.04] py-3">
          <span className="size-1.5 rounded-full bg-green-400" />

          <span className="text-[10px] text-green-300">
            Your website workspace
          </span>
        </div>
      </div>

      <div className="relative mt-8 h-px w-full bg-white/10">
        <div className="h-px w-full bg-purple-400/70 transition-all duration-700 group-hover:bg-purple-300" />
      </div>
    </div>
  );
};

export default WorkspaceCard;
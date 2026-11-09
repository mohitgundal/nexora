import React from "react";
import { FolderPlus, FileText, Layers, Target } from "lucide-react";

const DescribeCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

      {/* Step */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          01
        </span>

        <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
          PROJECT SETUP
        </span>
      </div>

      <h3 className="relative mt-8 text-2xl font-semibold">
        Create your project
      </h3>

      <p className="relative mt-3 leading-7 text-white/50">
        Start with a new project. Give it a name, choose what you're building,
        and define its primary goal.
      </p>

      {/* Project Setup Visual */}
      <div className="relative mt-8 space-y-4 rounded-xl border border-white/10 bg-black/40 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Project name
          </p>

          <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <FileText className="size-4 text-purple-300" />

            <span className="text-xs text-white/70">My new website</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <Layers className="size-4 text-purple-300" />

            <p className="mt-3 text-[10px] text-white/30">PROJECT TYPE</p>

            <p className="mt-1 text-xs text-white/70">Choose type</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <Target className="size-4 text-purple-300" />

            <p className="mt-3 text-[10px] text-white/30">PROJECT GOAL</p>

            <p className="mt-1 text-xs text-white/70">Define goal</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[10px] text-white/30">
            Your project starts here
          </span>

          <FolderPlus className="size-4 text-purple-300" />
        </div>
      </div>

      <div className="relative mt-8 h-px w-full overflow-hidden bg-white/10">
        <div className="h-full w-1/2 bg-purple-400 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  );
};

export default DescribeCard;

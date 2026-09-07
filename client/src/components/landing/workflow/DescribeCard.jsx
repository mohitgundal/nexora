import React from "react";

const DescribeCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

      {/* Step Number */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          01
        </span>

        <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
          DESCRIBE
        </span>
      </div>

      {/* Title */}
      <h3 className="relative mt-8 text-2xl font-semibold">
        Describe your idea
      </h3>

      {/* Description */}
      <p className="relative mt-3 leading-7 text-white/50">
        Tell Nexora what you want to build using simple, natural language.
      </p>

      {/* Mini Prompt UI */}
      <div className="relative mt-8 rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-purple-400 animate-pulse" />

          <span className="text-xs text-white/40">
            YOUR IDEA
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/70">
          Create a modern portfolio website for a creative designer...
          <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-purple-400" />
        </p>
      </div>

      {/* Bottom Progress Line */}
      <div className="relative mt-8 h-px w-full overflow-hidden bg-white/10">
        <div className="h-full w-1/2 bg-purple-400 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  );
};

export default DescribeCard;
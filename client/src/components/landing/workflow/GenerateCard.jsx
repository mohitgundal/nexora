import React from "react";

const GenerateCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

      {/* Step Number */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          02
        </span>

        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
          GENERATE
        </span>
      </div>

      {/* Title */}
      <h3 className="relative mt-8 text-2xl font-semibold">
        Nexora builds
      </h3>

      {/* Description */}
      <p className="relative mt-3 leading-7 text-white/50">
        Our AI transforms your vision into layouts, components, and experiences.
      </p>

      {/* AI Generation Visual */}
      <div className="relative mt-8 flex h-[120px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
        
        {/* Center AI Core */}
        <div className="relative flex size-12 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-400/10">
          <span className="size-3 animate-pulse rounded-full bg-purple-400" />
        </div>

        {/* Floating Elements */}
        <div className="absolute left-6 top-6 size-5 rounded-md border border-white/20 bg-white/[0.05] transition duration-500 group-hover:translate-x-3 group-hover:translate-y-2" />

        <div className="absolute right-6 top-8 size-7 rounded-md border border-blue-400/30 bg-blue-400/10 transition duration-500 group-hover:-translate-x-3 group-hover:translate-y-2" />

        <div className="absolute bottom-6 left-10 h-3 w-8 rounded bg-purple-400/20 transition duration-500 group-hover:translate-x-3" />

        <div className="absolute bottom-7 right-10 h-3 w-10 rounded bg-white/10 transition duration-500 group-hover:-translate-x-3" />

        {/* Connecting Lines */}
        <div className="absolute h-px w-20 rotate-[-25deg] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

        <div className="absolute h-px w-20 rotate-[25deg] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      </div>

      {/* Bottom Progress */}
      <div className="relative mt-8 flex gap-1">
        <div className="h-1 flex-1 rounded-full bg-purple-400/70" />
        <div className="h-1 flex-1 rounded-full bg-purple-400/40" />
        <div className="h-1 flex-1 rounded-full bg-purple-400/20" />
      </div>
    </div>
  );
};

export default GenerateCard;
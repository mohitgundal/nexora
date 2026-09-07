import React from "react";

const LaunchCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -bottom-16 size-40 rounded-full bg-green-500/10 blur-3xl transition duration-500 group-hover:bg-green-500/20" />

      {/* Step Number */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          03
        </span>

        <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs text-green-300">
          LAUNCH
        </span>
      </div>

      {/* Title */}
      <h3 className="relative mt-8 text-2xl font-semibold">
        Refine and launch
      </h3>

      {/* Description */}
      <p className="relative mt-3 leading-7 text-white/50">
        Make your final changes, publish your website, and share it with the world.
      </p>

      {/* Mini Website Preview */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3">
        
        {/* Browser Header */}
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
          <span className="size-1.5 rounded-full bg-red-400" />
          <span className="size-1.5 rounded-full bg-yellow-400" />
          <span className="size-1.5 rounded-full bg-green-400" />
        </div>

        {/* Website Preview */}
        <div className="pt-4">
          <div className="h-3 w-16 rounded bg-white/20" />

          <div className="mt-4 h-6 w-3/4 rounded bg-purple-400/20" />

          <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-10 rounded bg-white/[0.05]" />
            <div className="h-10 rounded bg-white/[0.05]" />
          </div>
        </div>

        {/* Live Badge */}
        <div className="absolute right-3 top-10 flex items-center gap-1 rounded-full border border-green-400/20 bg-green-400/10 px-2 py-1">
          <span className="size-1.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-[9px] font-medium text-green-300">
            LIVE
          </span>
        </div>
      </div>

      {/* Launch Status */}
      <div className="relative mt-8 flex items-center gap-2 text-sm text-green-400">
        <span className="size-2 animate-pulse rounded-full bg-green-400" />
        Website successfully published
      </div>
    </div>
  );
};

export default LaunchCard;
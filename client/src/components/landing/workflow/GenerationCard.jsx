import React from "react";
import { Sparkles, Code2, FileCode, Check } from "lucide-react";

const GenerationCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -left-16 -bottom-16 size-40 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          04
        </span>

        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
          GENERATION
        </span>
      </div>

      <h3 className="relative mt-8 text-2xl font-semibold">
        Generate your website
      </h3>

      <p className="relative mt-3 leading-7 text-white/50">
        Move beyond the plan. Nexora uses your approved website structure to
        generate the website experience.
      </p>

      {/* Generation Visual */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-purple-300" />

            <span className="text-xs text-white/70">Nexora generation</span>
          </div>

          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
        </div>

        <div className="mt-5 space-y-3">
          {[
            ["Project structure", true],
            ["Website components", true],
            ["Page layouts", true],
            ["Website output", false],
          ].map(([label, complete]) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-purple-400/10">
                <FileCode className="size-3.5 text-purple-300" />
              </div>

              <span className="text-xs text-white/60">{label}</span>

              {complete ? (
                <Check className="ml-auto size-4 text-green-400" />
              ) : (
                <Code2 className="ml-auto size-4 animate-pulse text-purple-300" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-purple-400" />
        </div>

        <p className="mt-2 text-right text-[10px] text-white/30">
          Turning your plan into a website
        </p>
      </div>

      <div className="relative mt-8 h-px w-full bg-white/10">
        <div className="h-px w-3/4 bg-purple-400/70 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  );
};

export default GenerationCard;

import React from "react";
import { Users, Palette, Check, Sparkles } from "lucide-react";

const GenerateCard = () => {
  const features = ["Contact forms", "Analytics", "Search"];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          02
        </span>

        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
          REQUIREMENTS
        </span>
      </div>

      <h3 className="relative mt-8 text-2xl font-semibold">
        Define your requirements
      </h3>

      <p className="relative mt-3 leading-7 text-white/50">
        Explain your idea, identify your audience, choose a visual direction,
        and select the features you need.
      </p>

      {/* Requirements Visual */}
      <div className="relative mt-8 space-y-4 rounded-xl border border-white/10 bg-black/40 p-4">
        {/* Audience */}
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
            <Users className="size-3.5" />
            TARGET AUDIENCE
          </p>

          <div className="flex flex-wrap gap-2">
            {["Consumers", "Businesses"].map((item) => (
              <span
                key={item}
                className={`rounded-lg border px-3 py-2 text-[10px] ${
                  item === "Businesses"
                    ? "border-purple-400/50 bg-purple-400/10 text-purple-200"
                    : "border-white/10 text-white/40"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Style */}
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
            <Palette className="size-3.5" />
            VISUAL STYLE
          </p>

          <div className="flex flex-wrap gap-2">
            {["Modern", "Minimal", "Bold"].map((item) => (
              <span
                key={item}
                className={`rounded-lg border px-3 py-2 text-[10px] ${
                  item === "Modern"
                    ? "border-purple-400/50 bg-purple-400/10 text-purple-200"
                    : "border-white/10 text-white/40"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
            <Sparkles className="size-3.5" />
            SELECTED FEATURES
          </p>

          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-400/30 bg-purple-400/10 px-2.5 py-2 text-[10px] text-purple-200"
              >
                <Check className="size-3" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex gap-1">
        <div className="h-1 flex-1 rounded-full bg-purple-400/70" />
        <div className="h-1 flex-1 rounded-full bg-purple-400/40" />
        <div className="h-1 flex-1 rounded-full bg-purple-400/20" />
      </div>
    </div>
  );
};

export default GenerateCard;

import React from "react";
import {
  LayoutTemplate,
  Type,
  PanelsTopLeft,
} from "lucide-react";

const GenerationPreview = ({
  project,
  requirements,
  currentStep,
}) => {
  const progress = Math.min(
    ((currentStep + 1) / 6) * 100,
    100
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            GENERATION PROGRESS
          </p>

          <h2 className="mt-3 text-xl font-semibold">
            Building your website structure
          </h2>
        </div>

        <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1.5 text-xs text-purple-300">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress */}
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-purple-400 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Website Information */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <LayoutTemplate className="size-5 text-purple-300" />

          <p className="mt-5 text-xs text-white/30">
            WEBSITE TYPE
          </p>

          <p className="mt-2 text-sm font-medium">
            {project.type}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <Type className="size-5 text-purple-300" />

          <p className="mt-5 text-xs text-white/30">
            DESIGN STYLE
          </p>

          <p className="mt-2 text-sm font-medium capitalize">
            {requirements.style}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <PanelsTopLeft className="size-5 text-purple-300" />

          <p className="mt-5 text-xs text-white/30">
            FEATURES
          </p>

          <p className="mt-2 text-sm font-medium">
            {requirements.features.length || "Core"} selected
          </p>
        </div>

      </div>

      {/* Current Context */}
      <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs text-white/30">
          WEBSITE VISION
        </p>

        <p className="mt-3 text-sm leading-7 text-white/55">
          {requirements.description}
        </p>
      </div>
    </div>
  );
};

export default GenerationPreview;
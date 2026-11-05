import React from "react";
import {
  CheckCircle2,
  Layers,
  Palette,
  MousePointer2,
} from "lucide-react";

const GenerationSummary = ({ project }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-green-400/20 bg-green-400/[0.035]">

      {/* Success Header */}

      <div className="relative px-6 py-10 sm:px-10 sm:py-12">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_55%)]" />

        <div className="relative flex flex-col items-center text-center">

          {/* Success Icon */}

          <div className="flex size-16 items-center justify-center rounded-full border border-green-400/25 bg-green-400/10">
            <CheckCircle2 className="size-8 text-green-300" />
          </div>

          {/* Heading */}

          <h2 className="mt-6 text-xl font-semibold">
            Your website is ready
          </h2>

          {/* Description */}

          <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
            Nexora has successfully prepared the initial version of{" "}
            <span className="text-white/70">
              {project.name}
            </span>
            . Your editing workspace is ready.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-400/15 bg-green-400/[0.06] px-3 py-1.5 text-xs text-green-300">
            <span className="size-1.5 rounded-full bg-green-400" />
            Website generation complete
          </div>
        </div>
      </div>

      {/* Generated Website Capabilities */}

      <div className="border-t border-white/10 p-6 sm:p-8">

        <div className="grid gap-3 sm:grid-cols-3">

          {/* Structured Pages */}

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <Layers className="size-5 text-purple-300" />

            <p className="mt-4 text-sm font-medium">
              Structured pages
            </p>

            <p className="mt-2 text-xs leading-5 text-white/35">
              Core sections are organized around your project goals.
            </p>
          </div>

          {/* Design Direction */}

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <Palette className="size-5 text-purple-300" />

            <p className="mt-4 text-sm font-medium">
              Design direction
            </p>

            <p className="mt-2 text-xs leading-5 text-white/35">
              Visual decisions follow your selected design style.
            </p>
          </div>

          {/* Ready to Refine */}

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <MousePointer2 className="size-5 text-purple-300" />

            <p className="mt-4 text-sm font-medium">
              Ready to refine
            </p>

            <p className="mt-2 text-xs leading-5 text-white/35">
              Continue editing through Nexora's builder environment.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default GenerationSummary;

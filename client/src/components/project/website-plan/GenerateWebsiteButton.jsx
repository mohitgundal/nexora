import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const GenerateWebsiteButton = ({ onGenerate }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-purple-400/20 bg-purple-400/[0.05] p-6 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2 text-purple-300">
          <Sparkles className="size-5" />

          <span className="text-sm font-medium">
            Ready to build
          </span>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
          Nexora will use this plan as the foundation for generating your
          website structure, interface, and initial implementation.
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
      >
        Generate Website

        <ArrowRight className="size-4" />
      </button>
    </div>
  );
};

export default GenerateWebsiteButton;
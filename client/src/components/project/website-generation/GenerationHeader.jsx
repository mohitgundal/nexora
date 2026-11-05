import React from "react";
import { Sparkles } from "lucide-react";

const GenerationHeader = ({ projectName }) => {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
        <Sparkles className="size-4" />

        WEBSITE GENERATION
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        Nexora is building
        <span className="block text-purple-400">
          {projectName}.
        </span>
      </h1>

      <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
        Your requirements and website plan are now being transformed into
        a structured website experience.
      </p>
    </div>
  );
};

export default GenerationHeader;
import React from "react";
import { Sparkles } from "lucide-react";

const PlanHeader = ({ project }) => {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
        <Sparkles className="size-4" />
        AI WEBSITE PLAN
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        Your website strategy is
        <span className="block text-purple-400">
          ready to build.
        </span>
      </h1>

      <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
        Nexora has analyzed your project requirements and created a
        structured plan for {project.name}.
      </p>
    </div>
  );
};

export default PlanHeader;
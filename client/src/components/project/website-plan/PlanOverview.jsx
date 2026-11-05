import React from "react";
import {
  LayoutTemplate,
  Target,
  Users,
  Sparkles,
} from "lucide-react";

const formatValue = (value) => {
  if (!value) return "Not specified";

  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const PlanOverview = ({ project, requirements }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

        {/* Project Information */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            PROJECT OVERVIEW
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {project.name}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
            {requirements.description}
          </p>
        </div>

        {/* AI Status */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
          <Sparkles className="size-4" />
          AI PLAN READY
        </div>

      </div>

      {/* Context Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/40">
            <LayoutTemplate className="size-4" />
            <span className="text-xs">PROJECT TYPE</span>
          </div>

          <p className="mt-3 text-sm font-medium text-white/85">
            {formatValue(project.type)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/40">
            <Target className="size-4" />
            <span className="text-xs">PRIMARY GOAL</span>
          </div>

          <p className="mt-3 text-sm font-medium text-white/85">
            {formatValue(project.goal)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/40">
            <Users className="size-4" />
            <span className="text-xs">AUDIENCE</span>
          </div>

          <p className="mt-3 text-sm font-medium text-white/85">
            {formatValue(requirements.audience)}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PlanOverview;
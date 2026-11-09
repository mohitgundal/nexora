import React from "react";

import CreateProjectCard from "./workflow/DescribeCard";
import RequirementsCard from "./workflow/GenerateCard";
import PlanCard from "./workflow/LaunchCard";
import GenerationCard from "./workflow/GenerationCard";
import WorkspaceCard from "./workflow/WorkspaceCard";

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Section Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50 sm:text-sm">
          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
          HOW NEXORA WORKS
        </div>

        <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          From your idea to a{" "}
          <span className="text-purple-400">working experience.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Every website starts with an idea. Nexora takes you through project
          setup, intelligent planning, generation, and a complete building
          workspace.
        </p>
      </div>

      {/* Workflow Cards */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <CreateProjectCard />
        <RequirementsCard />
        <PlanCard />
        <GenerationCard />
        <WorkspaceCard />
      </div>
    </section>
  );
};

export default HowItWorks;

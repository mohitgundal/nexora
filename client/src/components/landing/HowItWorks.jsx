import React from "react";

import DescribeCard from "./workflow/DescribeCard";
import GenerateCard from "./workflow/GenerateCard";
import LaunchCard from "./workflow/LaunchCard";

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Section Heading */}
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50 sm:text-sm">
          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
          HOW NEXORA WORKS
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          From an idea to a{" "}
          <span className="text-purple-400">
            live website.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Describe what you imagine. Nexora transforms your idea into a
          complete website in just a few intelligent steps.
        </p>
      </div>

      {/* Workflow Cards */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DescribeCard />

        <GenerateCard />

        <LaunchCard />
      </div>
    </section>
  );
};

export default HowItWorks;
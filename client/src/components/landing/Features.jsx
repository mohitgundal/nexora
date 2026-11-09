import React from "react";
import {
  ClipboardList,
  Workflow,
  Sparkles,
  PanelsTopLeft,
  Code2,
  Monitor,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    category: "PROJECT SETUP",
    icon: ClipboardList,
    title: "Start with clear requirements.",
    description:
      "Define your website's purpose, target audience, visual preferences, and essential functionality through a structured setup.",
  },
  {
    number: "02",
    category: "INTELLIGENT PLANNING",
    icon: Workflow,
    title: "Know what you're building.",
    description:
      "Turn your requirements into a structured website plan with proposed pages, layouts, and a clear design direction.",
  },
  {
    number: "03",
    category: "AI GENERATION",
    icon: Sparkles,
    title: "Build with context.",
    description:
      "Generate website pages and components based on your approved plan, rather than relying on a single unstructured prompt.",
  },
  {
    number: "04",
    category: "DEVELOPMENT WORKSPACE",
    icon: PanelsTopLeft,
    title: "Everything in one workspace.",
    description:
      "Bring AI assistance, project files, code editing, and live preview into one connected development environment.",
  },
  {
    number: "05",
    category: "CODE OWNERSHIP",
    icon: Code2,
    title: "Stay in control of your code.",
    description:
      "Access your generated source code, inspect the implementation, and make direct changes whenever you need.",
  },
  {
    number: "06",
    category: "LIVE DEVELOPMENT",
    icon: Monitor,
    title: "See your website take shape.",
    description:
      "Preview your website during development and review the actual result as your project evolves.",
  },
];

const Features = () => {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-purple-400" />
              <span className="text-xs font-medium tracking-[0.2em] text-purple-300">
                THE NEXORA ADVANTAGE
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              A smarter foundation
              <span className="text-white/40"> for building websites.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">
            From the first project requirement to the final development
            workspace, every part of Nexora is designed to work together.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0e] p-7 transition-all duration-300 hover:border-purple-400/25 hover:bg-[#0e0e13]"
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] transition-colors duration-300 group-hover:border-purple-400/25 group-hover:bg-purple-400/[0.07]">
                    <Icon className="size-[19px] text-white/65 transition-colors duration-300 group-hover:text-purple-300" />
                  </div>

                  <span className="font-mono text-xs text-white/20">
                    {feature.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="mt-10">
                  <p className="text-[10px] font-medium tracking-[0.16em] text-purple-300/70">
                    {feature.category}
                  </p>

                  <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/45">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom detail */}
                <div className="mt-auto flex items-center justify-between pt-8">
                  <div className="h-px w-10 bg-white/10 transition-all duration-300 group-hover:w-16 group-hover:bg-purple-400/60" />

                  <ArrowUpRight className="size-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-300" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

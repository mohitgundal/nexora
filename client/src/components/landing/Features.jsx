import React from "react";
import {
  Sparkles,
  Code2,
  Eye,
  WandSparkles,
  History,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Turn a simple idea into a structured website with intelligent layouts, sections, and components.",
  },
  {
    icon: WandSparkles,
    title: "Prompt-Based Editing",
    description:
      "Refine your website using natural language. Ask Nexora to change layouts, colors, content, and more.",
  },
  {
    icon: Code2,
    title: "Real Code Access",
    description:
      "View and edit the generated code whenever you need complete control over your website.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See your website evolve in real time while Nexora generates and updates your project.",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Track your website changes and return to previous versions whenever you need.",
  },
  {
    icon: Rocket,
    title: "Ready to Deploy",
    description:
      "Move from an idea to a live website with a streamlined workflow designed for fast publishing.",
  },
];

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
          Built for creating
        </p>

        <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          More than a website builder.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Nexora brings AI generation, visual editing, real code, and deployment
          into one connected workflow.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.05]"
            >
              {/* Background Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-32 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

              <div className="relative">
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10">
                  <Icon className="size-5 text-purple-400" />
                </div>

                {/* Content */}
                <h3 className="mt-8 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
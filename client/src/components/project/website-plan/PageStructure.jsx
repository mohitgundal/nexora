import React from "react";
import {
  Home,
  Layers,
  MessageSquare,
  Info,
  Mail,
  CheckCircle2,
} from "lucide-react";

const pageStructure = [
  {
    title: "Home",
    description:
      "Introduce the core value proposition and guide visitors toward the primary action.",
    icon: Home,
    sections: [
      "Hero section",
      "Core value proposition",
      "Key benefits",
      "Social proof",
      "Primary call to action",
    ],
  },
  {
    title: "Features / Services",
    description:
      "Explain the product, service, or capabilities in a clear and structured way.",
    icon: Layers,
    sections: [
      "Feature overview",
      "Detailed benefits",
      "How it works",
      "Use cases",
    ],
  },
  {
    title: "About / Trust",
    description:
      "Build credibility by explaining the brand, mission, and reasons to trust it.",
    icon: Info,
    sections: [
      "Company story",
      "Mission and values",
      "Trust indicators",
      "Testimonials",
    ],
  },
  {
    title: "Conversion Page",
    description:
      "Create a focused destination for the main action visitors should take.",
    icon: CheckCircle2,
    sections: [
      "Clear call to action",
      "Benefits",
      "Supporting information",
      "Conversion form",
    ],
  },
  {
    title: "Contact",
    description:
      "Give visitors a simple and direct way to reach the business.",
    icon: Mail,
    sections: [
      "Contact information",
      "Inquiry form",
      "Response expectations",
    ],
  },
];

const PageStructure = () => {
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-purple-300">
          WEBSITE STRUCTURE
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Recommended page architecture
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
          Nexora has organized the website around a clear user journey,
          helping visitors understand the offering and move toward the
          intended action.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {pageStructure.map((page, index) => {
          const Icon = page.icon;

          return (
            <div
              key={page.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex gap-4">

                {/* Step */}
                <div className="flex flex-col items-center">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10">
                    <Icon className="size-5 text-purple-300" />
                  </div>

                  {index !== pageStructure.length - 1 && (
                    <div className="mt-3 h-full w-px bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-medium">
                      {page.title}
                    </h3>

                    <span className="text-xs text-white/25">
                      PAGE {index + 1}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {page.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {page.sections.map((section) => (
                      <span
                        key={section}
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/50"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PageStructure;
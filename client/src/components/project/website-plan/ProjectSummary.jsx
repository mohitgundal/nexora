import React from "react";
import {
  FolderKanban,
  Target,
  Users,
  Palette,
} from "lucide-react";

const ProjectSummary = ({ project, requirements }) => {
  const summaryItems = [
    {
      label: "Project type",
      value: project.type,
      icon: FolderKanban,
    },
    {
      label: "Primary goal",
      value: project.goal,
      icon: Target,
    },
    {
      label: "Target audience",
      value: requirements.audience,
      icon: Users,
    },
    {
      label: "Visual direction",
      value: requirements.style,
      icon: Palette,
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Project summary
        </h2>

        <p className="mt-2 text-sm text-white/40">
          The core context Nexora will use to build your website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10">
                  <Icon className="size-5 text-purple-300" />
                </div>

                <div>
                  <p className="text-xs text-white/35">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-medium text-white/90 capitalize">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-white/30">
          Website vision
        </p>

        <p className="mt-3 text-sm leading-7 text-white/60">
          {requirements.description}
        </p>
      </div>
    </section>
  );
};

export default ProjectSummary;
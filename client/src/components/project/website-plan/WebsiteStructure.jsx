import React from "react";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Info,
  MessageSquare,
} from "lucide-react";

const WebsiteStructure = ({ project, requirements }) => {
  const pages = [
    {
      title: "Home",
      description:
        "Introduce the product or service and guide visitors toward the primary goal.",
      icon: LayoutDashboard,
    },
    {
      title: "About",
      description:
        "Build trust by explaining the story, mission, and value behind the project.",
      icon: Info,
    },
    {
      title: "Services",
      description:
        "Clearly explain the main products, services, or capabilities offered.",
      icon: FileText,
    },
    {
      title: "Contact",
      description:
        "Give visitors a clear way to connect, enquire, or take the next step.",
      icon: Mail,
    },
  ];

  const needsBlog = requirements.features.includes("Blog");

  if (needsBlog) {
    pages.splice(3, 0, {
      title: "Blog",
      description:
        "Publish useful content to educate visitors and strengthen authority.",
      icon: MessageSquare,
    });
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Recommended website structure
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Based on your {project.type} project and selected requirements.
        </p>
      </div>

      <div className="space-y-3">
        {pages.map((page, index) => {
          const Icon = page.icon;

          return (
            <div
              key={page.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/10 text-purple-300">
                <Icon className="size-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-sm font-medium">
                    {page.title}
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  {page.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WebsiteStructure;
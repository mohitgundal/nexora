import React from "react";
import {
  BriefcaseBusiness,
  LayoutTemplate,
  ShoppingBag,
  PanelsTopLeft,
  UserRound,
  CircleDot,
} from "lucide-react";

const projectTypes = [
  {
    id: "landing-page",
    title: "Landing Page",
    description: "Promote a product, service, or idea.",
    icon: LayoutTemplate,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Showcase your work and experience.",
    icon: UserRound,
  },
  {
    id: "business",
    title: "Business Website",
    description: "Build a professional online presence.",
    icon: BriefcaseBusiness,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Create an online store experience.",
    icon: ShoppingBag,
  },
  {
    id: "dashboard",
    title: "Web Application",
    description: "Build dashboards and product interfaces.",
    icon: PanelsTopLeft,
  },
  {
    id: "other",
    title: "Something Else",
    description: "Describe your idea in your own words.",
    icon: CircleDot,
  },
];

const ProjectTypeSelector = ({ value, onChange }) => {
  return ( 
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          What are you building?
        </h2>

        <p className="mt-1 text-sm text-white/40">
          This helps Nexora understand the structure your project needs.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={`group relative flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-purple-400/60 bg-purple-400/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition ${
                  isSelected
                    ? "border-purple-400/40 bg-purple-400/15"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <Icon
                  className={`size-5 ${
                    isSelected
                      ? "text-purple-300"
                      : "text-white/50"
                  }`}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium">
                  {type.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {type.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute right-3 top-3 size-2 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;
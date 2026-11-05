import React from "react";
import {
  Users,
  MousePointerClick,
  ShoppingCart,
  MessageSquare,
  Eye,
} from "lucide-react";

const goals = [
  {
    id: "get-leads",
    title: "Generate leads",
    description: "Encourage visitors to contact you or request a demo.",
    icon: Users,
  },
  {
    id: "sell",
    title: "Sell products or services",
    description: "Guide visitors toward making a purchase.",
    icon: ShoppingCart,
  },
  {
    id: "showcase",
    title: "Showcase my work",
    description: "Present projects, skills, or services clearly.",
    icon: Eye,
  },
  {
    id: "engagement",
    title: "Increase engagement",
    description: "Encourage users to explore and interact.",
    icon: MousePointerClick,
  },
  {
    id: "inform",
    title: "Share information",
    description: "Provide useful content and explain your offering.",
    icon: MessageSquare,
  },
];

const ProjectGoalSelector = ({ value, onChange }) => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          What is the main goal?
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Nexora will use this to shape the content and user journey.
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = value === goal.id;

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onChange(goal.id)}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-purple-400/60 bg-purple-400/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-purple-400/15 text-purple-300"
                    : "bg-white/[0.04] text-white/40"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium">
                  {goal.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {goal.description}
                </p>
              </div>

              <div
                className={`flex size-5 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-purple-400 bg-purple-400"
                    : "border-white/20"
                }`}
              >
                {isSelected && (
                  <span className="size-2 rounded-full bg-black" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGoalSelector;
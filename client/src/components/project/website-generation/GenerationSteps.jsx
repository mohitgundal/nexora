import React from "react";
import {
  Check,
  Circle,
  LoaderCircle,
} from "lucide-react";

const steps = [
  {
    id: "requirements",
    title: "Understanding requirements",
    description:
      "Analyzing your project goals, audience, features, and design preferences.",
  },
  {
    id: "architecture",
    title: "Planning website architecture",
    description:
      "Organizing pages, sections, content hierarchy, and user journeys.",
  },
  {
    id: "design",
    title: "Creating the design system",
    description:
      "Defining visual direction, typography, spacing, and interface patterns.",
  },
  {
    id: "components",
    title: "Building website components",
    description:
      "Creating reusable sections and structured interface components.",
  },
  {
    id: "interactions",
    title: "Preparing interactions",
    description:
      "Adding navigation, calls to action, and user interaction patterns.",
  },
  {
    id: "editor",
    title: "Preparing your editor",
    description:
      "Organizing the generated website so you can continue refining it.",
  },
];

const GenerationSteps = ({ currentStep }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div
            key={step.id}
            className={`flex gap-4 rounded-2xl border p-5 transition ${
              isCurrent
                ? "border-purple-400/40 bg-purple-400/[0.06]"
                : isCompleted
                ? "border-white/10 bg-white/[0.025]"
                : "border-white/5 bg-white/[0.01]"
            }`}
          >
            {/* Step Icon */}
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${
                isCurrent
                  ? "border-purple-400/40 bg-purple-400/10 text-purple-300"
                  : isCompleted
                  ? "border-green-400/30 bg-green-400/10 text-green-300"
                  : "border-white/10 text-white/20"
              }`}
            >
              {isCompleted && (
                <Check className="size-5" />
              )}

              {isCurrent && (
                <LoaderCircle className="size-5 animate-spin" />
              )}

              {isPending && (
                <Circle className="size-4" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`text-sm font-medium ${
                    isPending
                      ? "text-white/35"
                      : "text-white"
                  }`}
                >
                  {step.title}
                </h3>

                {isCurrent && (
                  <span className="text-xs text-purple-300">
                    In progress
                  </span>
                )}

                {isCompleted && (
                  <span className="text-xs text-green-300">
                    Completed
                  </span>
                )}
              </div>

              <p
                className={`mt-2 text-xs leading-6 ${
                  isPending
                    ? "text-white/25"
                    : "text-white/40"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GenerationSteps;
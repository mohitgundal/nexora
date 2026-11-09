import React from "react";

import { Check, Circle, LoaderCircle } from "lucide-react";

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

const GenerationSteps = ({
  currentStep = 0,
  progress = null,
  generationPhase = "generating",
}) => {
  const completedSteps = progress?.completedSteps || [];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        // Backend-confirmed completion.
        const isCompleted =
          generationPhase === "complete" || completedSteps.includes(stepNumber);

        // Current backend generation step.
        const isCurrent =
          !isCompleted &&
          generationPhase === "generating" &&
          currentStep === stepNumber;

        const isPending = !isCompleted && !isCurrent;

        return (
          <div
            key={step.id}
            className={`flex gap-4 rounded-2xl border p-5 transition duration-300 ${
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
              {isCompleted && <Check className="size-5" />}

              {isCurrent && <LoaderCircle className="size-5 animate-spin" />}

              {isPending && <Circle className="size-4" />}
            </div>

            {/* Step Content */}

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`text-sm font-medium ${
                    isPending ? "text-white/35" : "text-white"
                  }`}
                >
                  {step.title}
                </h3>

                {isCurrent && (
                  <span className="shrink-0 text-xs text-purple-300">
                    In progress
                  </span>
                )}

                {isCompleted && (
                  <span className="shrink-0 text-xs text-green-300">
                    Completed
                  </span>
                )}

                {isPending && (
                  <span className="shrink-0 text-xs text-white/20">
                    Pending
                  </span>
                )}
              </div>

              <p
                className={`mt-2 text-xs leading-6 ${
                  isPending ? "text-white/25" : "text-white/40"
                }`}
              >
                {isCurrent && progress?.message
                  ? progress.message
                  : step.description}
              </p>

              {/* Backend stage information */}

              {isCurrent && progress?.stage && (
                <p className="mt-2 text-[10px] uppercase tracking-wider text-purple-300/60">
                  {progress.stage.replace(/[-_]/g, " ")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GenerationSteps;

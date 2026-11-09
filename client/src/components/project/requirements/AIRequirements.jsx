import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import ProjectDescription from "./ProjectDescription";
import AudienceSelector from "./AudienceSelector";
import StyleSelector from "./StyleSelector";
import FeatureSelector from "./FeatureSelector";

const AIRequirements = ({ project, onBack, onContinue, onDraftChange }) => {
  const [description, setDescription] = useState(
    () => project?.requirements?.description || "",
  );

  const [audience, setAudience] = useState(
    () => project?.requirements?.audience || "",
  );

  const [style, setStyle] = useState(() => project?.requirements?.style || "");

  const [features, setFeatures] = useState(
    () => project?.requirements?.features || [],
  );

  /*
   * Restore previously saved requirements
   * whenever the project becomes available.
   */

  useEffect(() => {
    const requirementsData = {
      description: description.trim(),
      audience,
      style,
      features,
    };

    const timeoutId = setTimeout(() => {
      onDraftChange?.(requirementsData);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [description, audience, style, features, onDraftChange]);

  const canContinue = description.trim().length >= 20 && audience && style;

  // const handleContinue = () => {
  //   if (!canContinue) return;

  //   const requirementsData = {
  //     description: description.trim(),
  //     audience,
  //     style,
  //     features,
  //   };

  //   onContinue(requirementsData);
  // };

  const getRequirementsData = () => ({
    description: description.trim(),
    audience,
    style,
    features,
  });

  const handleContinue = () => {
    if (!canContinue) return;

    onContinue(getRequirementsData());
  };

  const handleBack = () => {
    onBack(getRequirementsData());
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to project setup
          </button>

          <span className="text-sm text-white/30">AI Requirements</span>
        </div>

        {/* Header */}
        <div className="mt-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
            <Sparkles className="size-4" />
            AI REQUIREMENTS
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Give Nexora the
            <span className="block text-purple-400">complete picture.</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
            The more context you provide, the better Nexora can understand your
            idea and create the right website plan.
          </p>
        </div>

        {/* Current Project Context */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Building
          </p>

          <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
            {project.name}
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
              {project.type}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
              {project.goal}
            </span>
          </div>
        </div>

        {/* Requirements Form */}
        <div className="mt-14 space-y-12">
          <ProjectDescription value={description} onChange={setDescription} />

          <div className="border-t border-white/10" />

          <AudienceSelector value={audience} onChange={setAudience} />

          <div className="border-t border-white/10" />

          <StyleSelector value={style} onChange={setStyle} />

          <div className="border-t border-white/10" />

          <FeatureSelector value={features} onChange={setFeatures} />

          {/* Continue */}
          <div className="flex justify-end border-t border-white/10 py-8">
            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              {/* Back Button */}

              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
              >
                <ArrowLeft className="size-4" />
                Back to project setup
              </button>

              {/* Continue Button */}

              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Generate AI Website Plan
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRequirements;

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PlanOverview from "./PlanOverview";
import PageStructure from "./PageStructure";
import FeaturePlan from "./FeaturePlan";
import DesignDirection from "./DesignDirection";

import useProject from "../../../hooks/useProject";
import { createWebsitePlan } from "./planData";

const WebsitePlan = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { getProjectById, savePlan } = useProject();

  const project = getProjectById(projectId);

  const requirements = project?.requirements;

  const [plan, setPlan] = useState(project?.plan || null);

  useEffect(() => {
    if (!project || !requirements) return;

    if (project.plan) {
      setPlan(project.plan);
      return;
    }

    const generatedPlan = createWebsitePlan(project, requirements);

    setPlan(generatedPlan);

    savePlan(projectId, generatedPlan);
  }, [projectId, project, requirements]);

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">Project not found</h1>

          <p className="mt-3 text-sm leading-6 text-white/40">
            This project could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Go to dashboard
          </button>
        </div>
      </main>
    );
  }

  if (!requirements) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">Requirements not found</h1>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Complete the project requirements before creating a website plan.
          </p>

          <button
            type="button"
            onClick={() => navigate(`/project/${projectId}/requirements`)}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Complete requirements
          </button>
        </div>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Preparing your website plan...
          </h1>
        </div>
      </main>
    );
  }

  const handleBack = () => {
    navigate(`/project/${projectId}/requirements`);
  };

  const handleGenerate = () => {
    navigate(`/project/${projectId}/generate`);
  };

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Top Navigation */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to requirements
          </button>

          <span className="text-sm text-white/30">Website Plan</span>
        </div>

        {/* Header */}

        <div className="mt-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
            <Sparkles className="size-4" />
            AI WEBSITE PLAN
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Here's how Nexora plans
            <span className="block text-purple-400">
              to build your website.
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
            Your project requirements have been transformed into a structured
            website strategy. Review the plan before moving into generation.
          </p>
        </div>

        {/* Plan Content */}

        <div className="mt-14 space-y-16">
          <PlanOverview
            project={project}
            requirements={requirements}
            plan={plan}
          />

          <div className="border-t border-white/10" />

          <PageStructure pages={plan.pages} />

          <div className="border-t border-white/10" />

          <FeaturePlan features={plan.features} />

          <div className="border-t border-white/10" />

          <DesignDirection designDirection={plan.designDirection} />

          {/* Generate */}

          <div className="flex flex-col gap-5 border-t border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Ready to generate your website?
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Nexora will use this plan as the foundation for generation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Start Website Generation
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WebsitePlan;

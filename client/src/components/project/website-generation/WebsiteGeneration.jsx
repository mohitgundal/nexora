import React, { useEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../../context/ProjectContext";

import { generateWebsite } from "../../../services/generationService";

import GenerationHeader from "./GenerationHeader";
import GenerationSteps from "./GenerationSteps";
import GenerationPreview from "./GenerationPreview";
import GenerationSummary from "./GenerationSummary";

const WebsiteGeneration = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { getProjectById, updateProject } = useProject();

  const project = getProjectById(projectId);
  const requirements = project?.requirements;

  const [currentStep, setCurrentStep] = useState(0);

  const [generationPhase, setGenerationPhase] = useState("generating");

  const [errorMessage, setErrorMessage] = useState("");

  const generationStartedRef = useRef(false);

  const handleBack = () => {
    navigate(`/project/${projectId}/plan`);
  };

  const handleOpenBuilder = () => {
    navigate(`/project/${projectId}/builder`);
  };

  const startGeneration = async () => {
    // Prevent duplicate requests.

    console.log("START GENERATION FUNCTION CALLED");

    if (generationStartedRef.current) {
      return;
    }

    generationStartedRef.current = true;

    setGenerationPhase("generating");
    setErrorMessage("");
    setCurrentStep(0);

    try {
      // Call the actual backend generation API.

      const response = await generateWebsite(projectId);

      if (
        !response.success ||
        !response.builder ||
        !Array.isArray(response.builder.files) ||
        response.builder.files.length === 0
      ) {
        throw new Error(
          response.message || "Invalid generated website response",
        );
      }

      // Synchronize the generated project with frontend context.
      // This ensures WebsiteBuilder receives the generated files.

      await updateProject(projectId, {
        builder: response.builder,
        code: response.builder.code,
        generationStatus: "completed",
      });

      // Mark all generation steps as completed.

      setCurrentStep(6);

      setGenerationPhase("complete");

      generationStartedRef.current = true;
    } catch (error) {
      console.error("Website generation failed:", error);

      setErrorMessage(
        error.message || "Something went wrong while generating your website.",
      );

      setGenerationPhase("error");

      // Allow the user to retry.

      generationStartedRef.current = false;
    }
  };

  useEffect(() => {
    console.log("GENERATION USEEFFECT RUNNING");

    console.log("PROJECT:", project);
    console.log("REQUIREMENTS:", requirements);
    console.log("PLAN:", project?.plan);
    console.log("GENERATION STATUS:", project?.generationStatus);

    if (!project || !requirements || !project.plan) {
      return;
    }

    // If a generated project already exists, do not generate again.

    const existingFiles = project.builder?.files;

    if (
      project.generationStatus === "completed" &&
      Array.isArray(existingFiles) &&
      existingFiles.length > 0
    ) {
      generationStartedRef.current = true;

      setCurrentStep(6);
      setGenerationPhase("complete");

      return;
    }

    startGeneration();
    console.log("CALLING START GENERATION");
  }, [projectId, Boolean(project?.requirements), Boolean(project?.plan)]);

  if (!project || !requirements || !project.plan) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Generation information not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Please complete the project setup, requirements, and website plan
            before generating your website.
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

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Top Navigation */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={generationPhase === "generating"}
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
            Back to website plan
          </button>

          <span className="text-sm text-white/30">Website Generation</span>
        </div>

        {/* Header */}

        <div className="mt-16">
          <GenerationHeader projectName={project.name} />
        </div>

        {/* Generation Content */}

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          {/* Steps */}

          <GenerationSteps currentStep={currentStep} />

          {/* Preview */}

          <div className="lg:sticky lg:top-8 lg:self-start">
            <GenerationPreview
              project={project}
              requirements={requirements}
              currentStep={currentStep}
            />
          </div>
        </div>

        {/* Generation Status */}

        <div className="mt-12">
          {/* Generating */}

          {generationPhase === "generating" && (
            <div className="overflow-hidden rounded-3xl border border-purple-400/20 bg-purple-400/[0.025]">
              <div className="relative px-6 py-12 sm:px-10 sm:py-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.10),transparent_55%)]" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="flex size-28 items-center justify-center rounded-full border border-purple-400/20 bg-purple-400/5">
                    <RefreshCw className="size-10 animate-spin text-purple-400" />
                  </div>

                  <h2 className="mt-8 text-xl font-semibold">
                    Nexora is generating your website
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                    Gemini is analyzing your project requirements and creating
                    your React application. This may take a little while.
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="size-1.5 animate-pulse rounded-full bg-purple-400" />

                    <span className="text-xs text-white/30">
                      Generating React project files
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}

          {generationPhase === "error" && (
            <div className="rounded-3xl border border-red-400/20 bg-red-400/[0.035] px-6 py-12 text-center sm:px-10">
              <h2 className="text-xl font-semibold">
                Website generation failed
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/50">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={startGeneration}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                <RefreshCw className="size-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Complete */}

          {generationPhase === "complete" && (
            <div className="animate-in fade-in duration-700">
              <GenerationSummary project={project} />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleOpenBuilder}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Open Builder
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default WebsiteGeneration;

import React, { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AIRequirementsForm from "../components/project/requirements/AIRequirements";
import useProject from "../hooks/useProject";

const AIRequirements = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const saveQueueRef = useRef(Promise.resolve());

  const { getProjectById, saveRequirements, loading } = useProject();

  const project = getProjectById(projectId);

  const handleDraftChange = useCallback(
  (requirements) => {
    saveQueueRef.current = saveQueueRef.current
      .catch(() => {})
      .then(() => saveRequirements(projectId, requirements));

    return saveQueueRef.current;
  },
  [projectId, saveRequirements]
);

  const handleBack = async (requirements) => {
    try {
      await saveRequirements(projectId, requirements);

      navigate(`/projects/new?projectId=${projectId}`);
    } catch (error) {
      console.error("Failed to save requirements before going back:", error);

      alert(error.message || "Failed to save your requirements");
    }
  };

  const handleContinue = async (requirements) => {
    try {
      await saveRequirements(projectId, requirements);

      console.log("Saved Requirements:", requirements);

      navigate(`/project/${projectId}/plan`);
    } catch (error) {
      console.error("Failed to save requirements:", error);

      alert(error.message || "Failed to save requirements");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-sm text-white/50">Loading project...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Project information not found
          </h1>

          <p className="mt-3 text-sm text-white/40">
            Please start a new project and complete the project setup first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <AIRequirementsForm
        key={projectId}
        project={project}
        onBack={handleBack}
        onContinue={handleContinue}
        onDraftChange={handleDraftChange}
      />
    </main>
  );
};

export default AIRequirements;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import AIRequirementsForm from "../components/project/requirements/AIRequirements";
import useProject from "../hooks/useProject";

const AIRequirements = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { getProjectById, saveRequirements } = useProject();

  const project = getProjectById(projectId);

  // Project not found
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

const handleBack = () => {
  navigate(`/projects/new?projectId=${projectId}`);
};

  const handleContinue = async (requirements) => {
    try {
      // Save requirements to MongoDB
      await saveRequirements(projectId, requirements);

      console.log("Saved Requirements:", requirements);

      // Only navigate after the save succeeds
      navigate(`/project/${projectId}/plan`);
    } catch (error) {
      console.error("Failed to save requirements:", error);

      alert(error.message || "Failed to save requirements");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <AIRequirementsForm
        project={project}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </main>
  );
};

export default AIRequirements;


import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useProject } from "../../../context/ProjectContext";

import ProjectNameInput from "./ProjectNameInput";
import ProjectTypeSelector from "./ProjectTypeSelector";
import ProjectGoalSelector from "./ProjectGoalSelector";

const ProjectSetup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const projectId = searchParams.get("projectId");

  const { createProject, getProjectById, updateProject, loading } =
    useProject();

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectGoal, setProjectGoal] = useState("");

  const canContinue = projectName.trim() && projectType && projectGoal;

  // Load existing project when editing
  useEffect(() => {
    if (!projectId) {
      setProjectName("");
      setProjectType("");
      setProjectGoal("");
      return;
    }

    if (loading) return;

    const existingProject = getProjectById(projectId);

    if (!existingProject) {
      console.warn("Project not found:", projectId);
      return;
    }

    setProjectName(existingProject.name || "");
    setProjectType(existingProject.type || "");
    setProjectGoal(existingProject.goal || "");
  }, [projectId, loading, getProjectById]);

  const handleContinue = async () => {
    if (!canContinue) return;

    try {
      let project;

      // EDIT EXISTING PROJECT
      if (projectId) {
        project = await updateProject(projectId, {
          name: projectName.trim(),
          type: projectType,
          goal: projectGoal,
        });

        console.log("Updated project:", project);
      }

      // CREATE NEW PROJECT
      else {
        project = await createProject({
          name: projectName.trim(),
          type: projectType,
          goal: projectGoal,
        });

        console.log("Created project:", project);
      }

      console.log("Project ID:", project._id);

      navigate(`/project/${project._id}/requirements`);
    } catch (error) {
      console.error("Failed to save project:", error);

      alert(error.message || "Failed to save project");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
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
            Back to dashboard
          </button>

          <div className="text-sm text-white/30">
            {projectId ? "Edit Project" : "New Project"}
          </div>
        </div>

        {/* Header */}
        <div className="mt-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
            <Sparkles className="size-4" />
            PROJECT SETUP
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's understand what
            <span className="block text-purple-400">you're building.</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
            Start with a few basics. Nexora will use this context to create a
            better plan for your website.
          </p>
        </div>

        {/* Form */}
        <div className="mt-14 space-y-12">
          <ProjectNameInput value={projectName} onChange={setProjectName} />

          <div className="border-t border-white/10" />

          <ProjectTypeSelector value={projectType} onChange={setProjectType} />

          <div className="border-t border-white/10" />

          <ProjectGoalSelector value={projectGoal} onChange={setProjectGoal} />

          {/* Continue */}
          <div className="flex justify-end border-t border-white/10 pb-12 pt-8">
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continue to AI Requirements
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSetup;

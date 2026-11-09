const mongoose = require("mongoose");
const Project = require("../models/Project");

const {
  generateWebsiteProject,
} = require("../services/websiteGenerationService");

const TOTAL_GENERATION_STEPS = 6;

const generateWebsite = async (req, res) => {
  let project;

  try {
    const { projectId } = req.body;

    // Validate project ID.
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project belonging to authenticated user.
    project = await Project.findOne({
      _id: projectId,
      user: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Prevent duplicate simultaneous generation.
    if (project.generationStatus === "generating") {
      return res.status(409).json({
        success: false,
        message: "Website generation is already in progress",
      });
    }

    // Validate project information.
    if (!project.requirements) {
      return res.status(400).json({
        success: false,
        message: "Project requirements are missing",
      });
    }

    if (!project.plan) {
      return res.status(400).json({
        success: false,
        message: "Website plan is missing",
      });
    }

    const startedAt = new Date();

    // Initialize generation progress.
    project.generationStatus = "generating";

    project.generationProgress = {
      stage: "starting",
      step: 0,
      totalSteps: TOTAL_GENERATION_STEPS,
      message: "Starting website generation",
      completedSteps: [],
      startedAt,
      updatedAt: startedAt,
      completedAt: null,
      error: null,
    };

    await project.save();

    // Generate website and receive actual backend progress events.
    const generatedProject = await generateWebsiteProject({
      project,
      requirements: project.requirements,
      plan: project.plan,

      onProgress: async (event) => {
        const { step, stage, message, status } = event;

        // Validate progress event.
        if (
          !Number.isInteger(step) ||
          step < 1 ||
          step > TOTAL_GENERATION_STEPS ||
          typeof stage !== "string" ||
          typeof message !== "string"
        ) {
          throw new Error("Invalid generation progress event");
        }

        const currentProgress =
          project.generationProgress?.toObject?.() ||
          project.generationProgress ||
          {};

        const completedSteps = [...(currentProgress.completedSteps || [])];

        // Record a stage only after actual completion.
        if (status === "completed" && !completedSteps.includes(step)) {
          completedSteps.push(step);
        }

        project.generationProgress = {
          ...currentProgress,

          stage,
          step,
          totalSteps: TOTAL_GENERATION_STEPS,
          message,

          completedSteps: completedSteps.sort((a, b) => a - b),

          startedAt: currentProgress.startedAt || startedAt,
          updatedAt: new Date(),
          completedAt: null,
          error: null,
        };

        project.markModified("generationProgress");

        // Persist every actual progress event.
        await project.save();

        console.log("Nexora generation progress:", {
          projectId: project._id,
          step,
          stage,
          message,
          status,
        });
      },
    });

    // Validate generated application entry file.
    const appFile = generatedProject.files.find(
      (file) => file.path === "src/App.jsx",
    );

    if (!appFile) {
      throw new Error("Generated App.jsx file is missing");
    }

    // Preserve existing builder information.
    const existingBuilder = project.builder || {};

    // Save generated files and maintain compatibility
    // with the existing single-file editor.
    project.builder = {
      ...existingBuilder,

      files: generatedProject.files,

      entryFile: generatedProject.entryFile,

      code: appFile.content,

      generatedAt: new Date(),

      generationMessage: generatedProject.message,
    };

    // Keep legacy project code synchronized.
    project.code = appFile.content;

    // Mark generation as successfully completed.
    project.generationStatus = "completed";

    const currentProgress =
      project.generationProgress?.toObject?.() ||
      project.generationProgress ||
      {};

    project.generationProgress = {
      ...currentProgress,

      stage: "completed",
      step: TOTAL_GENERATION_STEPS,
      totalSteps: TOTAL_GENERATION_STEPS,

      message: "Website generated successfully",

      completedSteps: Array.from(
        { length: TOTAL_GENERATION_STEPS },
        (_, index) => index + 1,
      ),

      startedAt: currentProgress.startedAt || startedAt,
      updatedAt: new Date(),
      completedAt: new Date(),
      error: null,
    };

    project.markModified("builder");
    project.markModified("generationProgress");

    await project.save();

    return res.status(200).json({
      success: true,

      message: "Website generated successfully",

      projectId: project._id,

      generationStatus: project.generationStatus,

      generationProgress: project.generationProgress,

      builder: project.builder,
    });
  } catch (error) {
    console.error("Website generation error:", error);

    // Record failure without losing existing project data.
    if (project) {
      try {
        const currentProgress =
          project.generationProgress?.toObject?.() ||
          project.generationProgress ||
          {};

        project.generationStatus = "failed";

        project.generationProgress = {
          ...currentProgress,

          stage: "failed",

          message: "Website generation failed",

          updatedAt: new Date(),

          completedAt: null,

          error: error.message,
        };

        project.markModified("generationProgress");

        await project.save();
      } catch (saveError) {
        console.error("Failed to update generation status:", saveError);
      }
    }

    return res.status(500).json({
      success: false,

      message: "Failed to generate website",

      generationStatus: "failed",

      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getGenerationProgress = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      user: req.user.userId,
    }).select("generationStatus generationProgress");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      projectId: project._id,
      generationStatus: project.generationStatus,
      generationProgress: project.generationProgress,
    });
  } catch (error) {
    console.error("Get generation progress error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch generation progress",
    });
  }
};

module.exports = {
  generateWebsite,
  getGenerationProgress,
};

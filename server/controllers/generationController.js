
const mongoose = require("mongoose");
const Project = require("../models/Project");

const {
  generateWebsiteProject,
} = require("../services/websiteGenerationService");

const generateWebsite = async (req, res) => {
  let project;

  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    // Find the project belonging to the authenticated user.

    project = await Project.findOne({
      _id: projectId,
      user: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Validate project information.

    if (!project.requirements) {
      return res.status(400).json({
        message: "Project requirements are missing",
      });
    }

    if (!project.plan) {
      return res.status(400).json({
        message: "Website plan is missing",
      });
    }

    // Mark generation as in progress.

    project.generationStatus = "generating";
    await project.save();

    // Generate the actual React project using Gemini.

    const generatedProject = await generateWebsiteProject({
      project,
      requirements: project.requirements,
      plan: project.plan,
    });

    const appFile = generatedProject.files.find(
      (file) => file.path === "src/App.jsx"
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

    // Keep the legacy project code field synchronized.

    project.code = appFile.content;

    project.generationStatus = "completed";

    project.markModified("builder");

    await project.save();

    return res.status(200).json({
      success: true,

      message: "Website generated successfully",

      projectId: project._id,

      generationStatus: project.generationStatus,

      builder: project.builder,
    });
  } catch (error) {
    console.error("Website generation error:", error);

    // Record failure without losing the existing project.

    if (project) {
      try {
        project.generationStatus = "failed";
        await project.save();
      } catch (saveError) {
        console.error(
          "Failed to update generation status:",
          saveError
        );
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate website",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

module.exports = {
  generateWebsite,
};

const Project = require("../models/Project");
const { processBuilderInstruction } = require("../services/aiService");

const processBuilderRequest = async (req, res) => {
  try {
    const { projectId, prompt, websiteData } = req.body;

    if (!projectId || !prompt) {
      return res.status(400).json({
        message: "Project ID and prompt are required",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      user: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const currentWebsiteData =
      websiteData || project.builder?.websiteData || {};

    const action = await processBuilderInstruction({
      prompt,
      websiteData: currentWebsiteData,
    });

    return res.json({
      message: action.message,
      actions: action.actions,
    });
  } catch (error) {
    console.error("Builder AI error:", error);

    return res.status(500).json({
      message: "Failed to process AI builder request",
    });
  }
};

module.exports = {
  processBuilderRequest,
};

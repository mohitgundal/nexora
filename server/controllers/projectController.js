const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name, type, goal } = req.body;

    if (!name || !type || !goal) {
      return res.status(400).json({
        message: "Name, type and goal are required",
      });
    }

    const project = await Project.create({
      user: req.user.userId,
      name,
      type,
      goal,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      message: "Server error while creating project",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.userId,
    }).sort({
      updatedAt: -1,
    });

    return res.json({
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      message: "Server error while fetching projects",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.json({
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    return res.status(500).json({
      message: "Server error while fetching project",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "type",
      "goal",
      "requirements",
      "plan",
      "website",
      "code",
      "generationStatus",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Safely update individual builder properties.
    // This preserves builder properties that are not included
    // in the current save request.
    const builderUpdates = req.body.builder;

    if (builderUpdates !== undefined) {
      if (
        builderUpdates === null ||
        typeof builderUpdates !== "object" ||
        Array.isArray(builderUpdates)
      ) {
        return res.status(400).json({
          message: "Builder data must be an object",
        });
      }

      Object.entries(builderUpdates).forEach(([key, value]) => {
        if (key.includes(".") || key.startsWith("$") || key === "__proto__") {
          return;
        }

        updates[`builder.${key}`] = value;
      });
    }

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.projectId,
        user: req.user.userId,
      },
      {
        $set: updates,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      message: "Server error while updating project",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      user: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      message: "Server error while deleting project",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

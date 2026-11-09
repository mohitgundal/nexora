const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    plan: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    builder: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    website: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    code: {
      type: String,
      default: "",
    },

    generationStatus: {
      type: String,
      enum: ["draft", "generating", "completed", "failed"],
      default: "draft",
    },

    // Tracks actual backend generation progress.
    generationProgress: {
      stage: {
        type: String,
        default: "idle",
      },

      step: {
        type: Number,
        default: 0,
      },

      totalSteps: {
        type: Number,
        default: 6,
      },

      message: {
        type: String,
        default: "Waiting for generation",
      },

      completedSteps: {
        type: [Number],
        default: [],
      },

      startedAt: {
        type: Date,
        default: null,
      },

      updatedAt: {
        type: Date,
        default: null,
      },

      completedAt: {
        type: Date,
        default: null,
      },

      error: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);

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
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
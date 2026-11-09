const express = require("express");

const {
  generateWebsite,
  getGenerationProgress,
} = require("../controllers/generationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Start website generation
router.post("/generate", authMiddleware, generateWebsite);

// Fetch real-time generation progress
router.get("/progress/:projectId", authMiddleware, getGenerationProgress);

module.exports = router;

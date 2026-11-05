
const express = require("express");

const {
  generateWebsite,
} = require("../controllers/generationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  generateWebsite
);

module.exports = router;

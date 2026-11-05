const express = require("express");
const {
  processBuilderRequest,
} = require("../controllers/builderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/request",
  authMiddleware,
  processBuilderRequest
);

module.exports = router;
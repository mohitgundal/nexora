require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const builderRoutes = require("./routes/builderRoutes");
const generationRoutes = require("./routes/generationRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  "https://nexora-11mor3paz-mohitgundal21-6549.vercel.app",
]
  .filter(Boolean)
  .map((origin) => origin.trim().replace(/\/+$/, ""));

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request origin:", origin);

      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.trim().replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        console.log("CORS approved:", normalizedOrigin);
        return callback(null, true);
      }

      console.error("CORS rejected:", normalizedOrigin);

      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/builder", builderRoutes);
app.use("/api/generation", generationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Nexora API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Nexora server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

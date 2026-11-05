require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const builderRoutes = require("./routes/builderRoutes");
const generationRoutes = require("./routes/generationRoutes");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(PORT, () => {
  console.log(`Nexora server running on port ${PORT}`);
});

import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import NewProject from "../pages/NewProject";
import Settings from "../pages/Settings";

import AIRequirements from "../pages/AIRequirements";

import WebsitePlan from "../components/project/website-plan/WebsitePlan";
import WebsiteGeneration from "../components/project/website-generation/WebsiteGeneration";
import WebsiteBuilder from "../components/project/builder/WebsiteBuilder";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Shared Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* New Project Workflow */}
        <Route path="/projects/new" element={<NewProject />} />

        {/* Individual Project Workflow */}
        <Route
          path="/project/:projectId/requirements"
          element={<AIRequirements />}
        />

        <Route path="/project/:projectId/plan" element={<WebsitePlan />} />

        <Route
          path="/project/:projectId/generate"
          element={<WebsiteGeneration />}
        />

        {/* Existing Project Workspace */}
        <Route
          path="/project/:projectId/builder"
          element={<WebsiteBuilder />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

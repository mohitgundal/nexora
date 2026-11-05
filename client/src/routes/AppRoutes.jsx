import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NewProject from "../pages/NewProject";
import Projects from "../pages/Projects";

import AIRequirements from "../pages/AIRequirements";

import WebsitePlan from "../components/project/website-plan/WebsitePlan";
import WebsiteGeneration from "../components/project/website-generation/WebsiteGeneration";
import WebsiteBuilder from "../components/project/builder/WebsiteBuilder";

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

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/new"
          element={<NewProject />}
        />

        <Route
          path="/project/:projectId/requirements"
          element={<AIRequirements />}
        />

        <Route
          path="/project/:projectId/plan"
          element={<WebsitePlan />}
        />

        <Route
          path="/project/:projectId/generate"
          element={<WebsiteGeneration />}
        />

        <Route
          path="/project/:projectId/builder"
          element={<WebsiteBuilder />}
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;
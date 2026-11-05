import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import {
  createProject as createProjectAPI,
  getProjects as getProjectsAPI,
  updateProject as updateProjectAPI,
  deleteProject as deleteProjectAPI,
} from "../services/projectService";

export const ProjectContext = createContext(null);

const ProjectProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const loadProjects = async () => {
      setLoading(true);

      try {
        const data = await getProjectsAPI();

        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user, authLoading]);

  const createProject = async (projectData) => {
    const data = await createProjectAPI(projectData);

    const newProject = data.project;

    setProjects((previousProjects) => [newProject, ...previousProjects]);

    return newProject;
  };

  const updateProject = async (projectId, updates) => {
    const data = await updateProjectAPI(projectId, updates);

    const updatedProject = data.project;

    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        String(project._id) === String(projectId) ? updatedProject : project,
      ),
    );

    return updatedProject;
  };

  const getProjectById = (projectId) => {
    return projects.find(
      (project) =>
        String(project._id) === String(projectId) ||
        String(project.id) === String(projectId),
    );
  };

  const saveRequirements = async (projectId, requirements) => {
    return updateProject(projectId, {
      requirements,
    });
  };

  const savePlan = async (projectId, plan) => {
    return updateProject(projectId, {
      plan,
    });
  };

  const saveBuilder = async (projectId, builderData) => {
    return updateProject(projectId, {
      builder: builderData,
    });
  };

  const deleteProject = async (projectId) => {
  await deleteProjectAPI(projectId);

  setProjects((previousProjects) =>
    previousProjects.filter(
      (project) =>
        String(project._id) !== String(projectId) &&
        String(project.id) !== String(projectId)
    )
  );
};

  const value = {
    projects,
    loading,
    createProject,
    updateProject,
    getProjectById,
    saveRequirements,
    savePlan,
    saveBuilder,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used inside ProjectProvider");
  }

  return context;
};

export default ProjectProvider;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    if (authLoading) return;

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

  const createProject = useCallback(async (projectData) => {
    const data = await createProjectAPI(projectData);
    const newProject = data.project;

    setProjects((previousProjects) => [newProject, ...previousProjects]);

    return newProject;
  }, []);

  const updateProject = useCallback(async (projectId, updates) => {
    const data = await updateProjectAPI(projectId, updates);
    const updatedProject = data.project;

    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        String(project._id) === String(projectId) ? updatedProject : project,
      ),
    );

    return updatedProject;
  }, []);

  const getProjectById = useCallback(
    (projectId) => {
      return projects.find(
        (project) =>
          String(project._id) === String(projectId) ||
          String(project.id) === String(projectId),
      );
    },
    [projects],
  );

  const saveRequirements = useCallback(
    (projectId, requirements) => {
      return updateProject(projectId, { requirements });
    },
    [updateProject],
  );

  const savePlan = useCallback(
    (projectId, plan) => {
      return updateProject(projectId, { plan });
    },
    [updateProject],
  );

  const saveBuilder = useCallback(
    (projectId, builderData) => {
      return updateProject(projectId, { builder: builderData });
    },
    [updateProject],
  );

  const deleteProject = useCallback(async (projectId) => {
    await deleteProjectAPI(projectId);

    setProjects((previousProjects) =>
      previousProjects.filter(
        (project) =>
          String(project._id) !== String(projectId) &&
          String(project.id) !== String(projectId),
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      projects,
      loading,
      createProject,
      updateProject,
      getProjectById,
      saveRequirements,
      savePlan,
      saveBuilder,
      deleteProject,
    }),
    [
      projects,
      loading,
      createProject,
      updateProject,
      getProjectById,
      saveRequirements,
      savePlan,
      saveBuilder,
      deleteProject,
    ],
  );

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

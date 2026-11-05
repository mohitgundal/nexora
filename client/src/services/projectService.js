import api from "./api";

export const createProject = async (projectData) => {
  return api("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
};

export const getProjects = async () => {
  return api("/projects");
};

export const getProjectById = async (projectId) => {
  return api(`/projects/${projectId}`);
};

export const updateProject = async (projectId, projectData) => {
  return api(`/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(projectData),
  });
};

export const deleteProject = async (projectId) => {
  return api(`/projects/${projectId}`, {
    method: "DELETE",
  });
};
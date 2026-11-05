import api from "./api";


export const saveBuilderProject = async (
  projectId,
  builderData
) => {
  return api(
    `/projects/${projectId}/builder`,
    {
      method: "PATCH",
      body: JSON.stringify(builderData),
    }
  );
};


export const getBuilderProject = async (
  projectId
) => {
  return api(
    `/projects/${projectId}/builder`
  );
};


export const createVersion = async (
  projectId,
  versionData
) => {
  return api(
    `/projects/${projectId}/versions`,
    {
      method: "POST",
      body: JSON.stringify(versionData),
    }
  );
};


export const getVersions = async (
  projectId
) => {
  return api(
    `/projects/${projectId}/versions`
  );
};


export const restoreVersion = async (
  projectId,
  versionId
) => {
  return api(
    `/projects/${projectId}/versions/${versionId}/restore`,
    {
      method: "POST",
    }
  );
};


export const sendBuilderRequest = async (
  projectId,
  prompt,
  websiteData
) => {
  return api("/builder/request", {
    method: "POST",
    body: JSON.stringify({
      projectId,
      prompt,
      websiteData,
    }),
  });
};
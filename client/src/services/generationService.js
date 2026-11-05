import api from "./api";

export const generateWebsite = async (projectId) => {
  return api("/generation/generate", {
    method: "POST",
    body: JSON.stringify({
      projectId,
    }),
  });
};
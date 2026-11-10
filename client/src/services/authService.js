import api from "./api";

export const registerUser = async (userData) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = async (credentials) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const logoutUser = async () =>
  api("/auth/logout", {
    method: "POST",
  });

export const getCurrentUser = async () => api("/auth/me");

export const updateUserProfile = async (profileData) =>
  api("/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });

export const changeUserPassword = async (passwordData) =>
  api("/auth/password", {
    method: "PATCH",
    body: JSON.stringify(passwordData),
  });

import api from "./api";

// Start website generation.
export const generateWebsite = async (projectId) => {
  return api("/generation/generate", {
    method: "POST",
    body: JSON.stringify({
      projectId,
    }),
  });
};

// Fetch the latest generation progress.
export const getGenerationProgress = async (projectId) => {
  return api(`/generation/progress/${projectId}`, {
    method: "GET",
  });
};

// Poll backend progress until stopped or an error occurs.
export const pollGenerationProgress = (
  projectId,
  onProgress,
  onError,
  interval = 1500,
) => {
  let stopped = false;
  let timeoutId = null;

  const stopPolling = () => {
    stopped = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const poll = async () => {
    if (stopped) return;

    try {
      const response = await getGenerationProgress(projectId);

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to fetch generation progress",
        );
      }

      onProgress?.(response);

      // Stop polling when generation reaches a terminal state.
      if (
        response.generationStatus === "completed" ||
        response.generationStatus === "failed"
      ) {
        stopPolling();
        return;
      }
    } catch (error) {
      if (!stopped) {
        onError?.(error);
      }

      stopPolling();
      return;
    }

    if (!stopped) {
      timeoutId = setTimeout(poll, interval);
    }
  };

  // Start immediately instead of waiting for the first interval.
  poll();

  return stopPolling;
};

import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useProject } from "../../../context/ProjectContext";

import {
  createVersionSnapshot,
  createInitialCode,
  createInitialVersions,
  createInitialWebsiteData,
  generateWebsiteCode,
} from "./builderData";

import { applyAIActions } from "./builderActions";

import {
  createVersion,
  markPreviousVersionsAsSaved,
  hasCodeChanged,
  restoreVersionData,
  parseWebsiteCode,
} from "./builderActions";

import BuilderHeader from "./BuilderHeader";
import BuilderWorkspace from "./BuilderWorkspace";

import { sendBuilderRequest } from "../../../services/builderService";

const WebsiteBuilder = () => {
  const navigate = useNavigate();

  const { projectId } = useParams();
  const [saveStatus, setSaveStatus] = useState("saved");

  const { getProjectById, saveBuilder } = useProject();

  const project = getProjectById(projectId);
  const requirements = project?.requirements;

  const [activeView, setActiveView] = useState("preview");

  const [code, setCode] = useState("");
  const [websiteData, setWebsiteData] = useState(null);

  const [versions, setVersions] = useState([]);

  const [lastSavedCode, setLastSavedCode] = useState("");

  // Multi-file project state
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState("");

  const saveTimerRef = useRef(null);
  const pendingSaveRef = useRef(null);

  const flushPendingSave = async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    const pendingSave = pendingSaveRef.current;

    if (pendingSave) {
      pendingSaveRef.current = null;
      await pendingSave();
    }
  };

  // Initialize the Builder
  useEffect(() => {
    if (!project || !requirements) return;

    const savedBuilder = project.builder || {};

    // CASE 1: Load AI-generated project files
    if (Array.isArray(savedBuilder.files) && savedBuilder.files.length > 0) {
      const generatedFiles = savedBuilder.files;

      const preferredPath =
        savedBuilder.activeFile || savedBuilder.entryFile || "src/App.jsx";

      const selectedFile =
        generatedFiles.find((file) => file.path === preferredPath) ||
        generatedFiles.find((file) => file.path === "src/App.jsx") ||
        generatedFiles[0];

      const initialWebsiteData =
        savedBuilder.websiteData ||
        createInitialWebsiteData(project, requirements);

      setFiles(generatedFiles);
      setActiveFile(selectedFile.path);
      setCode(selectedFile.content || "");
      setWebsiteData(initialWebsiteData);
      setVersions(savedBuilder.versions || []);
      setLastSavedCode(selectedFile.content || "");

      return;
    }

    // CASE 2: Restore an existing single-file Builder project
    if (savedBuilder.code && savedBuilder.websiteData) {
      setFiles([]);
      setActiveFile("");

      setCode(savedBuilder.code);
      setWebsiteData(savedBuilder.websiteData);
      setLastSavedCode(savedBuilder.code);
      setVersions(savedBuilder.versions || []);

      return;
    }

    // CASE 3: Create the initial Builder for older projects
    const initialCode = createInitialCode(project, requirements);

    const initialWebsiteData = createInitialWebsiteData(project, requirements);

    const initialVersions = createInitialVersions();

    const preparedVersions = initialVersions.map((version, index) => ({
      ...version,
      code: index === 0 ? initialCode : "",
      websiteData: index === 0 ? initialWebsiteData : null,
      createdAt: version.createdAt || new Date().toISOString(),
    }));

    setFiles([]);
    setActiveFile("");

    setCode(initialCode);
    setWebsiteData(initialWebsiteData);
    setLastSavedCode(initialCode);
    setVersions(preparedVersions);

    saveBuilder(projectId, {
      code: initialCode,
      websiteData: initialWebsiteData,
      versions: preparedVersions,
    });
  }, [projectId, Boolean(project), Boolean(requirements)]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }

      const pendingSave = pendingSaveRef.current;
      pendingSaveRef.current = null;

      if (pendingSave) {
        pendingSave().catch((error) => {
          console.error("Nexora: Final save failed:", error);
        });
      }
    };
  }, []);

  if (!project || !requirements) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Builder information not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Please complete website generation before opening the builder.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Go to dashboard
          </button>
        </div>
      </main>
    );
  }

  if (!websiteData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08080a] text-white">
        <div className="text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-white/50">
            Preparing your website builder...
          </p>
        </div>
      </main>
    );
  }

  const handleBack = async () => {
    await flushPendingSave();
    navigate(`/project/${projectId}/generate`);
  };

  // Select a generated file
  const handleSelectFile = async (filePath) => {
    await flushPendingSave();
    const selectedFile = files.find((file) => file.path === filePath);

    if (!selectedFile) return;

    setActiveFile(filePath);
    setCode(selectedFile.content || "");
    setLastSavedCode(selectedFile.content || "");

    saveBuilder(projectId, {
      ...project.builder,
      files,
      activeFile: filePath,
      code: selectedFile.content || "",
      websiteData,
      versions,
    });
  };

  // Save a version snapshot
  const handleSaveVersion = () => {
    const codeChanged = hasCodeChanged(lastSavedCode, code);

    if (!codeChanged) return;

    const newVersion = createVersion({
      name: "Manual code update",
      description: "Updated through the Nexora builder.",
      status: "current",
      code,
      websiteData,
    });

    const previousVersions = markPreviousVersionsAsSaved(versions);

    const updatedVersions = [...previousVersions, newVersion].slice(-20);

    setVersions(updatedVersions);
    setLastSavedCode(code);

    saveBuilder(projectId, {
      ...project.builder,
      files,
      activeFile,
      code,
      websiteData,
      versions: updatedVersions,
    });
  };

  // AI Builder
  const handleAIAction = async (instruction) => {
    try {
      const data = await sendBuilderRequest(
        projectId,
        instruction,
        websiteData,
      );

      console.log("Gemini Builder Response:", data);

      if (!Array.isArray(data.actions) || data.actions.length === 0) {
        throw new Error("AI did not return valid actions.");
      }

      const updatedWebsiteData = applyAIActions(
        websiteData,
        data.actions,
        data.message,
      );

      const updatedCode = generateWebsiteCode(updatedWebsiteData);

      const newVersion = createVersionSnapshot({
        label: data.message || instruction,
        code: updatedCode,
        websiteData: updatedWebsiteData,
      });

      const updatedVersions = [...versions, newVersion].slice(-20);

      // If this is a generated multi-file project,
      // update only its main App.jsx file.
      let updatedFiles = files;

      if (files.length > 0) {
        const entryPath = project.builder?.entryFile || "src/App.jsx";

        updatedFiles = files.map((file) =>
          file.path === entryPath ? { ...file, content: updatedCode } : file,
        );

        setFiles(updatedFiles);
        setActiveFile(entryPath);
      }

      setWebsiteData(updatedWebsiteData);
      setCode(updatedCode);
      setVersions(updatedVersions);

      await saveBuilder(projectId, {
        ...project.builder,
        files: updatedFiles,
        entryFile: project.builder?.entryFile || "src/App.jsx",
        activeFile:
          files.length > 0 ? project.builder?.entryFile || "src/App.jsx" : "",
        code: updatedCode,
        websiteData: updatedWebsiteData,
        versions: updatedVersions,
      });

      setLastSavedCode(updatedCode);

      return data.message;
    } catch (error) {
      console.error("AI Builder action failed:", error);
      throw error;
    }
  };

  // Deploy
  const handleDeploy = () => {
    handleSaveVersion();

    console.log({
      projectId,
      project,
      requirements,
      files,
      activeFile,
      code,
      versions,
    });
  };

  // Restore version
  const handleRestoreVersion = async (versionId) => {
    try {
      const version = restoreVersionData(versions, versionId);

      if (!version) return;

      if (!version.code || !version.websiteData) {
        console.error("This version does not contain a complete snapshot.");
        return;
      }

      const restoredCode = version.code;

      const restoredWebsiteData = structuredClone(version.websiteData);

      const updatedVersions = versions.map((item) => ({
        ...item,
        status: item.id === versionId ? "current" : "saved",
      }));

      let updatedFiles = files;

      if (files.length > 0) {
        const targetPath =
          activeFile || project.builder?.entryFile || "src/App.jsx";

        updatedFiles = files.map((file) =>
          file.path === targetPath ? { ...file, content: restoredCode } : file,
        );

        setFiles(updatedFiles);
      }

      setWebsiteData(restoredWebsiteData);
      setCode(restoredCode);
      setLastSavedCode(restoredCode);
      setVersions(updatedVersions);

      await saveBuilder(projectId, {
        ...project.builder,
        files: updatedFiles,
        activeFile,
        code: restoredCode,
        websiteData: restoredWebsiteData,
        versions: updatedVersions,
      });
    } catch (error) {
      console.error("Version restoration failed:", error);
    }
  };

  // Handle editor changes
  // Handle editor changes

  // Handle editor changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);

    // Multi-file project
    if (files.length > 0 && activeFile) {
      const updatedFiles = files.map((file) =>
        file.path === activeFile ? { ...file, content: newCode } : file,
      );

      // Update preview immediately.
      setFiles(updatedFiles);
      setSaveStatus("unsaved");

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }

      // Store the latest save operation.
      pendingSaveRef.current = async () => {
        setSaveStatus("saving");

        try {
          await saveBuilder(projectId, {
            files: updatedFiles,
            code: newCode,
            websiteData,
            versions,
          });

          setSaveStatus("saved");
        } catch (error) {
          setSaveStatus("error");
          throw error;
        }
      };

      saveTimerRef.current = setTimeout(async () => {
        saveTimerRef.current = null;

        const pendingSave = pendingSaveRef.current;
        pendingSaveRef.current = null;

        if (pendingSave) {
          try {
            await pendingSave();
            console.log("Nexora: File saved successfully.");
          } catch (error) {
            console.error("Nexora: Failed to save file:", error);
          }
        }
      }, 700);

      return;
    }

    // Older single-file project
    if (!websiteData) return;

    const updatedWebsiteData = parseWebsiteCode(newCode, websiteData);

    setWebsiteData(updatedWebsiteData);
    setSaveStatus("unsaved");

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    pendingSaveRef.current = async () => {
      await saveBuilder(projectId, {
        code: newCode,
        websiteData: updatedWebsiteData,
        versions,
      });
    };

    saveTimerRef.current = setTimeout(async () => {
      saveTimerRef.current = null;

      const pendingSave = pendingSaveRef.current;
      pendingSaveRef.current = null;

      if (pendingSave) {
        try {
          await pendingSave();
          console.log("Nexora: Single-file project saved successfully.");
        } catch (error) {
          console.error("Nexora: Failed to save project:", error);
        }
      }
    }, 700);
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#08080a] text-white">
      <BuilderHeader
        project={project}
        activeView={activeView}
        setActiveView={setActiveView}
        onBack={handleBack}
        onDeploy={handleDeploy}
      />

      <div className="min-h-0 flex-1">
        <BuilderWorkspace
          project={project}
          requirements={requirements}
          websiteData={websiteData}
          activeView={activeView}
          code={code}
          onCodeChange={handleCodeChange}
          saveStatus={saveStatus}
          versions={versions}
          onAIAction={handleAIAction}
          onRestoreVersion={handleRestoreVersion}
          files={files}
          activeFile={activeFile}
          onSelectFile={handleSelectFile}
        />
      </div>
    </main>
  );
};

export default WebsiteBuilder;

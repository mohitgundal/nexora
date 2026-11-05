import React, { useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import CodeMirror from "@uiw/react-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";

import {
  EditorView,
  highlightActiveLine,
  lineNumbers,
  highlightActiveLineGutter,
  keymap,
} from "@codemirror/view";

import {
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from "@codemirror/language";

import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";

import { defaultKeymap } from "@codemirror/commands";

import { FileCode2, Save, LoaderCircle } from "lucide-react";

const normalizePath = (path) =>
  `/${String(path || "src/App.jsx")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")}`;

const getLanguageExtension = (filePath) => {
  const extension = filePath.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "js":
    case "jsx":
      return javascript({ jsx: true });

    case "ts":
    case "tsx":
      return javascript({ jsx: true, typescript: true });

    case "css":
      return css();

    case "html":
      return html();

    case "json":
      return json();

    default:
      return javascript({ jsx: true });
  }
};

const editorExtensions = [
  lineNumbers(),
  highlightActiveLine(),
  highlightActiveLineGutter(),
  foldGutter(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  EditorView.lineWrapping,
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...foldKeymap]),
];

const CodeEditor = ({ onChange, activeFile, saveStatus }) => {
  const { sandpack } = useSandpack();

  const filePath = normalizePath(activeFile);
  const currentFile = sandpack.files[filePath];
  const fileName = filePath.split("/").pop();

  useEffect(() => {
    if (currentFile && sandpack.activeFile !== filePath) {
      sandpack.setActiveFile(filePath);
    }
  }, [currentFile, filePath, sandpack]);

  const handleChange = (updatedCode) => {
    sandpack.updateFile(filePath, updatedCode);
    onChange(updatedCode);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#08090d]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex min-w-0 items-center gap-2 text-xs text-gray-300">
          <FileCode2 size={14} className="shrink-0 text-violet-400" />
          <span className="truncate">{fileName}</span>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-gray-400">
          {saveStatus === "saving" ? (
            <>
              <LoaderCircle size={13} className="animate-spin" />
              Saving...
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Save size={13} className="text-emerald-400" />
              Saved
            </>
          ) : (
            <span>Unsaved changes</span>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {currentFile ? (
          <CodeMirror
            key={filePath}
            value={currentFile.code ?? ""}
            height="100%"
            theme={oneDark}
            extensions={[...editorExtensions, getLanguageExtension(filePath)]}
            onChange={handleChange}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
              highlightActiveLineGutter: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              indentOnInput: true,
              tabSize: 2,
            }}
            className="h-full overflow-auto text-[13px]"
            style={{
              height: "100%",
              fontSize: "13px",
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Select a file to edit.
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;

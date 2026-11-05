import React from "react";
import { FolderPlus } from "lucide-react";

const ProjectNameInput = ({ value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="project-name"
        className="mb-3 flex items-center gap-2 text-sm font-medium text-white"
      >
        <FolderPlus className="size-4 text-purple-400" />
        Project name
      </label>

      <input
        id="project-name"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Nexora Marketing Website"
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50 focus:bg-white/[0.05]"
      />

      <p className="mt-2 text-xs text-white/30">
        Give your project a name you can easily recognize later.
      </p>
    </div>
  );
};

export default ProjectNameInput;
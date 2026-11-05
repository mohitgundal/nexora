import React from "react";
import { FileText } from "lucide-react";

const ProjectDescription = ({ value, onChange }) => {
  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-400/10">
            <FileText className="size-4 text-purple-300" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Describe your website
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Explain what you want to build and what visitors should experience.
            </p>
          </div>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Example: I want to create a modern website for my AI startup. The website should explain our product, showcase key features, build trust with potential customers, and encourage visitors to request a demo."
        rows={7}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50 focus:bg-white/[0.05]"
      />

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-white/30">
          Be as specific as you can.
        </span>

        <span className="text-white/30">
          {value.length} characters
        </span>
      </div>
    </div>
  );
};

export default ProjectDescription;
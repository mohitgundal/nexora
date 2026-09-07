import React from "react";
import { ExternalLink, MoreHorizontal } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-purple-400/30 hover:bg-white/[0.05]">
      {/* Preview */}
      <div className="relative h-40 border-b border-white/10 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10">
        <div className="absolute inset-6 rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="h-2 w-16 rounded bg-white/20" />

          <div className="mt-5 h-4 w-3/4 rounded bg-white/15" />

          <div className="mt-3 h-2 w-1/2 rounded bg-white/10" />

          <div className="mt-5 flex gap-2">
            <div className="h-8 flex-1 rounded bg-purple-500/20" />
            <div className="h-8 flex-1 rounded bg-white/5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">
              {project.name}
            </h3>

            <p className="mt-1 text-sm text-white/40">
              {project.type}
            </p>
          </div>

          <button className="text-white/40 transition hover:text-white">
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-white/30">
            Updated {project.updated}
          </span>

          <button className="flex items-center gap-2 text-xs text-purple-300 transition hover:text-purple-200">
            Open project
            <ExternalLink className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
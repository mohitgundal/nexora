import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { useProject } from "../context/ProjectContext";

const Projects = () => {
  const { projects, loading } = useProject();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 text-white">
        <p className="text-white/50">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 text-white lg:p-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-purple-400">NEXORA</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            My Projects
          </h2>

          <p className="mt-2 text-sm text-white/40">
            Create, manage and continue building your websites.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      {/* Projects */}
      <div className="mt-10">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h3 className="text-xl font-semibold">No projects yet</h3>

            <p className="mt-2 text-sm text-white/40">
              Create your first website with Nexora.
            </p>

            <Link
              to="/projects/new"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/project/${project._id}/builder`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-purple-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>

                    <p className="mt-1 text-xs text-white/35">{project.type}</p>
                  </div>

                  <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
                    {project.generationStatus}
                  </span>
                </div>

                <p className="mt-5 line-clamp-2 text-sm leading-6 text-white/45">
                  {project.goal}
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="text-xs text-white/30 transition group-hover:text-purple-300">
                    Continue project →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

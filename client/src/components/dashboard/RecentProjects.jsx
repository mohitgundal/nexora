import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    name: "Creative Studio",
    type: "Portfolio Website",
    updated: "Just now",
  },
  {
    id: 2,
    name: "Nexora Labs",
    type: "SaaS Landing Page",
    updated: "2 days ago",
  },
];

const RecentProjects = () => {
  return (
    <section className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Recent projects
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Continue building where you left off.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white"
        >
          <Plus className="size-4" />

          New project
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
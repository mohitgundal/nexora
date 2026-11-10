import React from "react";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentProjects from "../components/dashboard/RecentProjects";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-10">
      {/* Welcome */}
      <section>
        <p className="text-sm text-purple-400">Welcome back</p>

        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Ready to build something?
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
          Turn your ideas into complete websites with Nexora's AI-powered
          generation workflow.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-10">
        <DashboardStats />
      </section>

      {/* Recent Projects */}
      <RecentProjects />
    </div>
  );
};

export default Dashboard;

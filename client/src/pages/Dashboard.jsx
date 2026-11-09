import React, { useState } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentProjects from "../components/dashboard/RecentProjects";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#050506] text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-10">
          {/* Welcome */}
          <section>
            <p className="text-sm text-purple-400">Welcome back</p>

            <h2 className="mt-2 text-2xl font-semibold sm:text-4xl">
              Ready to build something?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
              Turn your ideas into complete websites with Nexora's AI-powered
              generation workflow.
            </p>
          </section>

          {/* Stats */}
          <section className="mt-8 sm:mt-10">
            <DashboardStats />
          </section>

          {/* Projects */}
          <RecentProjects />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

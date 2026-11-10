import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardHeader = ({ onMenuClick, isSidebarOpen }) => {
  const location = useLocation();

  const pageDetails = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Your workspace at a glance.",
    },
    "/projects": {
      title: "My Projects",
      subtitle: "Manage and organize your websites.",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage your account preferences.",
    },
  };

  const currentPage = pageDetails[location.pathname] || {
    title: "Workspace",
    subtitle: "Build something extraordinary.",
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center border-b border-white/10 bg-[#050506]/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Navigation */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={
            isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isSidebarOpen}
          aria-controls="dashboard-sidebar"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
        >
          {isSidebarOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>

        {/* Page Information */}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
            {currentPage.title}
          </h1>

          <p className="mt-1 truncate text-xs text-white/40 sm:text-sm">
            {currentPage.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

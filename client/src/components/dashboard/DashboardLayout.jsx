
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar whenever the route changes.
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Support closing the mobile sidebar with Escape.
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative flex min-h-screen bg-[#050506] text-white">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        <DashboardHeader
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;

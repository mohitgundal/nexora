import React from "react";

import { Bell, Search, Menu } from "lucide-react";

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <header className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.06] lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        {/* Page Title */}
        <div className="min-w-0">
          <p className="text-xs text-white/40 sm:text-sm">Workspace</p>

          <h1 className="mt-1 text-xl font-semibold sm:text-2xl">Dashboard</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
        <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/40 transition hover:bg-white/[0.05] md:flex">
          <Search className="size-4" />
          Search projects
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition hover:bg-white/[0.06] hover:text-white sm:size-10"
        >
          <Bell className="size-4" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-purple-400" />
        </button>

        {/* User */}
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold sm:size-10">
          M
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

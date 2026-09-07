import React from "react";
import { Bell, Search } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
      {/* Mobile / Page Title */}
      <div>
        <p className="text-sm text-white/40">
          Workspace
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/40 transition hover:bg-white/[0.05] md:flex">
          <Search className="size-4" />

          Search projects
        </button>

        {/* Notification */}
        <button className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition hover:bg-white/[0.06] hover:text-white">
          <Bell className="size-4" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-purple-400" />
        </button>

        {/* User */}
        <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold">
          M
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
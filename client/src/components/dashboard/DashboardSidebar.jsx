import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "My Projects",
      icon: FolderKanban,
      path: "/projects",
    },
  ];

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-white/10 bg-[#08080a] p-5">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-2">
        <img
          src="/logo.png"
          alt="Nexora logo"
          className="size-10 object-contain"
        />

        <span className="text-xl font-bold tracking-tight">
          Nexora
        </span>
      </Link>

      {/* Create Project */}
      <Link
        to="/projects/new"
        className="mt-10 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
      >
        <Plus className="size-4" />
        New Project
      </Link>

      {/* Navigation */}
      <nav className="mt-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-purple-500/10 text-purple-300"
                  : "text-white/50 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon className="size-4" />

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white">
          <Settings className="size-4" />
          Settings
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400">
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

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

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();

      onClose?.();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      setLogoutError(error.message || "Unable to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      id="dashboard-sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-[#08080a] p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 px-2">
          <img
            src="/logo.png"
            alt="Nexora logo"
            className="size-10 object-contain"
          />

          <span className="text-xl font-bold tracking-tight">Nexora</span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="flex size-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Create Project */}
      <Link
        to="/projects/new"
        onClick={onClose}
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
              onClick={onClose}
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

      {/* Bottom Navigation */}
      <div className="mt-auto space-y-2 pt-8">
        <Link
          to="/settings"
          onClick={onClose}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
            location.pathname === "/settings"
              ? "bg-purple-500/10 text-purple-300"
              : "text-white/50 hover:bg-white/[0.04] hover:text-white"
          }`}
        >
          <Settings className="size-4" />
          Settings
        </Link>

        {/* Logout Error */}
        {logoutError && (
          <p role="alert" className="px-3 text-xs leading-5 text-red-400">
            {logoutError}
          </p>
        )}

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut className="size-4" />

          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12 lg:py-6">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-10 sm:size-12 lg:size-14">
            <img
              src="/logo.png"
              alt="Nexora logo"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="hidden text-2xl font-bold lg:block">
            Nexora
          </span>
        </Link>
      </div>

      {/* Navigation CTA */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          to="/login"
          className="rounded-xl px-3 py-2 text-xs font-light transition hover:bg-white/15 sm:px-4 sm:text-sm"
        >
          Log in
        </Link>

        <Link
          to="/register"
          className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-200 hover:text-black sm:px-4 sm:text-sm"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
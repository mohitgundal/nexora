import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nexora logo"
                className="size-10 object-contain"
              />

              <span className="text-xl font-bold">Nexora</span>
            </Link>

            <p className="mt-5 text-sm leading-6 text-white/40">
              Build websites at the speed of thought with AI-powered generation,
              editing, and deployment.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/40">
              <Link
                to="/register"
                className="transition hover:text-white"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/register"
                className="transition hover:text-white"
              >
                Create Project
              </Link>
            </div>
          </div>

          {/* Workflow */}
          <div>
            <h3 className="text-sm font-semibold">Workflow</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/40">
              <span>Describe</span>
              <span>Generate</span>
              <span>Refine</span>
              <span>Launch</span>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">Account</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/40">
              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="transition hover:text-white"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>

          <p>
            AI-powered website creation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
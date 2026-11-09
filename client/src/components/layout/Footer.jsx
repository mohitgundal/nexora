import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Get Started", to: "/register" },
        { label: "Dashboard", to: "/login" },
        { label: "Create a Project", to: "/register" },
        { label: "Sign In", to: "/login" },
      ],
    },
    {
      title: "How it works",
      links: [
        { label: "Describe your idea", to: "/register" },
        { label: "Generate with AI", to: "/register" },
        { label: "Customize your website", to: "/register" },
        { label: "Bring it to life", to: "/register" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Log in", to: "/login" },
        { label: "Create account", to: "/register" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#08080c]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-600/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main footer */}
        <div className="grid gap-14 py-16 md:grid-cols-[1.5fr_2fr] md:gap-20 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="group inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nexora"
                className="size-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <span className="text-xl font-semibold tracking-tight text-white">
                Nexora
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/45">
              From your first idea to a fully realized digital experience.
              Build, refine, and bring your vision to life with AI.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.06] px-3 py-1.5">
              <Sparkles size={13} className="text-purple-300" />
              <span className="text-[11px] font-medium tracking-wide text-purple-200/80">
                BUILD BEYOND LIMITS
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                  {section.title}
                </h3>

                <div className="mt-6 flex flex-col gap-4">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="group flex w-fit items-center gap-1.5 text-sm text-white/40 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow strip */}
        <div className="flex flex-col gap-5 border-t border-white/[0.07] py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-white/70">
              Your vision. Our intelligence.
            </p>
            <p className="mt-1 text-xs text-white/30">
              A smarter way to create for the web.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/35 sm:gap-5">
            {["Imagine", "Generate", "Refine", "Launch"].map((step, index) => (
              <React.Fragment key={step}>
                <span className="transition-colors hover:text-purple-300">
                  {step}
                </span>

                {index !== 3 && <span className="text-white/15">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {currentYear} Nexora. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-xs text-white/30">
              Crafted for the next generation of the web.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

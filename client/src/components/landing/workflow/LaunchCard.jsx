import React from "react";
import { FileText, Check, Layout, Layers } from "lucide-react";

const LaunchCard = () => {
  const pages = [
    "Home",
    "About",
    "Services",
    "Contact",
  ];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -right-16 -bottom-16 size-40 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-purple-400">
          03
        </span>

        <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
          WEBSITE PLAN
        </span>
      </div>

      <h3 className="relative mt-8 text-2xl font-semibold">
        Review your website plan
      </h3>

      <p className="relative mt-3 leading-7 text-white/50">
        Nexora organizes your requirements into a structured
        website plan. Review its pages, design direction, and features.
      </p>

      {/* Website Plan Visual */}
      <div className="relative mt-8 rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-purple-300" />

            <span className="text-xs font-medium text-white/80">
              Website plan
            </span>
          </div>

          <span className="rounded-full bg-green-400/10 px-2 py-1 text-[9px] text-green-300">
            Ready to review
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-[10px] text-white/30">
              DESIGN DIRECTION
            </p>

            <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <Layout className="size-4 text-purple-300" />

              <span className="text-xs text-white/70">
                Visual layout and design
              </span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] text-white/30">
              PROPOSED PAGES
            </p>

            <div className="grid grid-cols-2 gap-2">
              {pages.map((page, index) => (
                <div
                  key={page}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
                >
                  <Layers className="size-3 text-purple-300" />

                  <span className="text-[10px] text-white/60">
                    {page}
                  </span>

                  {index === 0 && (
                    <Check className="ml-auto size-3 text-green-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 h-px w-full bg-white/10">
        <div className="h-px w-2/3 bg-purple-400/70 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  );
};

export default LaunchCard;
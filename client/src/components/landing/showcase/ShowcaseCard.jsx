import React from "react";
import { ArrowUpRight } from "lucide-react";

const ShowcaseCard = ({ number, title, description, category, children }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] transition duration-500 hover:-translate-y-1 hover:border-purple-400/30">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-purple-500/[0.07] blur-3xl transition duration-700 group-hover:bg-purple-500/[0.13]" />

      {/* Card Information */}
      <div className="relative flex items-start justify-between gap-4 p-6 sm:p-7">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-[0.2em] text-purple-400">
              {number}
            </span>

            <span className="h-px w-8 bg-white/15" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
              {category}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
            {description}
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 transition duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-400/10 group-hover:text-purple-300">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Website Preview */}
      <div className="relative px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-2xl transition duration-500 group-hover:border-white/20">
          {children}
        </div>
      </div>
    </article>
  );
};

export default ShowcaseCard;

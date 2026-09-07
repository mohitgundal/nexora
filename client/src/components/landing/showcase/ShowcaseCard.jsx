import React from "react";

const ShowcaseCard = ({ number, title, description, children }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.05]">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-purple-500/10 blur-3xl transition duration-500 group-hover:bg-purple-500/20" />

      {/* Top Section */}
      <div className="relative flex items-start justify-between">
        <div>
          <span className="text-xs font-medium tracking-[0.2em] text-purple-400">
            {number}
          </span>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {title}
          </h3>
        </div>

        <div className="size-2 rounded-full bg-purple-400 opacity-50 transition duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.8)]" />
      </div>

      {/* Description */}
      <p className="relative mt-3 text-sm leading-6 text-white/45">
        {description}
      </p>

      {/* Website Preview */}
      <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#09090b] p-4">
        {children}
      </div>

    </div>
  );
};

export default ShowcaseCard;
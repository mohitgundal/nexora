import React from "react";
import ShowcaseCard from "./ShowcaseCard";

const ShowcaseSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50">
          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
          BUILT FOR ANY IDEA
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          One idea.
          <span className="text-purple-400"> Endless possibilities.</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          From ambitious startups to personal portfolios and online stores,
          Nexora helps transform almost any idea into a polished digital
          experience.
        </p>

      </div>


      {/* Showcase Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* SaaS */}
        <ShowcaseCard
          number="01"
          title="SaaS Platforms"
          description="Build powerful dashboards, products, and software experiences."
        >
          {/* Fake SaaS Dashboard */}
          <div className="flex gap-3">

            {/* Sidebar */}
            <div className="w-12 space-y-3 border-r border-white/10 pr-3">
              <div className="h-3 w-full rounded bg-purple-400/30" />
              <div className="h-2 w-8 rounded bg-white/10" />
              <div className="h-2 w-6 rounded bg-white/10" />
              <div className="h-2 w-9 rounded bg-white/10" />
            </div>

            {/* Dashboard */}
            <div className="flex-1">
              <div className="h-3 w-24 rounded bg-white/20" />

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-purple-400/15" />
                <div className="h-10 rounded bg-blue-400/15" />
                <div className="h-10 rounded bg-white/[0.05]" />
              </div>

              {/* Chart */}
              <div className="mt-3 flex h-20 items-end gap-2 rounded bg-white/[0.03] p-3">
                <div className="h-5 flex-1 rounded-t bg-purple-400/30" />
                <div className="h-10 flex-1 rounded-t bg-purple-400/50" />
                <div className="h-7 flex-1 rounded-t bg-purple-400/40" />
                <div className="h-14 flex-1 rounded-t bg-purple-400/70" />
                <div className="h-9 flex-1 rounded-t bg-purple-400/50" />
              </div>
            </div>

          </div>
        </ShowcaseCard>


        {/* Portfolio */}
        <ShowcaseCard
          number="02"
          title="Creative Portfolios"
          description="Showcase your work with expressive layouts and bold visual storytelling."
        >
          <div>
            <div className="h-24 rounded-lg bg-purple-400/10" />

            <div className="mt-4 h-4 w-3/4 rounded bg-white/30" />

            <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-10 rounded bg-white/[0.08]" />
              <div className="h-10 rounded bg-purple-400/10" />
              <div className="h-10 rounded bg-white/[0.05]" />
            </div>
          </div>
        </ShowcaseCard>


        {/* Ecommerce */}
        <ShowcaseCard
          number="03"
          title="Ecommerce Stores"
          description="Create immersive storefronts designed to showcase products and drive sales."
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-white/20" />
              <div className="h-3 w-10 rounded bg-purple-400/30" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <div className="h-16 rounded bg-purple-400/15" />
                <div className="mt-2 h-2 w-full rounded bg-white/15" />
                <div className="mt-1 h-2 w-1/2 rounded bg-purple-400/30" />
              </div>

              <div>
                <div className="h-16 rounded bg-blue-400/15" />
                <div className="mt-2 h-2 w-full rounded bg-white/15" />
                <div className="mt-1 h-2 w-1/2 rounded bg-purple-400/30" />
              </div>

              <div>
                <div className="h-16 rounded bg-white/[0.08]" />
                <div className="mt-2 h-2 w-full rounded bg-white/15" />
                <div className="mt-1 h-2 w-1/2 rounded bg-purple-400/30" />
              </div>
            </div>
          </div>
        </ShowcaseCard>


        {/* Startup */}
        <ShowcaseCard
          number="04"
          title="Startup Websites"
          description="Launch your product with modern landing pages built to communicate clearly."
        >
          <div>
            {/* Fake Navbar */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-12 rounded bg-white/20" />

              <div className="flex gap-2">
                <div className="h-2 w-8 rounded bg-white/10" />
                <div className="h-2 w-8 rounded bg-white/10" />
                <div className="h-2 w-8 rounded bg-white/10" />
              </div>
            </div>

            {/* Hero */}
            <div className="mt-6">
              <div className="h-5 w-3/4 rounded bg-purple-400/25" />
              <div className="mt-3 h-3 w-1/2 rounded bg-white/10" />

              <div className="mt-4 h-7 w-24 rounded bg-purple-400/30" />
            </div>
          </div>
        </ShowcaseCard>

      </div>

    </section>
  );
};

export default ShowcaseSection;
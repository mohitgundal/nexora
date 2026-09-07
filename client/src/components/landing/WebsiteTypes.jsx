import React from "react";

const websiteTypes = [
  {
    title: "Portfolio",
    description: "Showcase your work and tell your story.",
    className: "md:col-span-2",
  },
  {
    title: "SaaS",
    description: "Build modern products and dashboards.",
    className: "",
  },
  {
    title: "Ecommerce",
    description: "Create beautiful online stores.",
    className: "",
  },
  {
    title: "Landing Pages",
    description: "Launch your next idea with a powerful landing page.",
    className: "md:col-span-2",
  },
];

const WebsiteTypes = () => {
  return (
    <section className="border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
            What you can build
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            One idea.
            <br />
            Endless possibilities.
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            From simple landing pages to complete digital products, tell
            Nexora what you want and start building.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {websiteTypes.map((website) => (
            <div
              key={website.title}
              className={`group relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 ${website.className}`}
            >
              {/* Fake website preview */}
              <div className="absolute inset-x-6 top-6 h-32 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-4 transition duration-500 group-hover:scale-[1.02]">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                </div>

                <div className="mt-5 h-2 w-20 rounded bg-white/15" />

                <div className="mt-3 h-3 w-3/4 rounded bg-white/10" />

                <div className="mt-3 flex gap-2">
                  <div className="h-8 flex-1 rounded bg-purple-500/10" />
                  <div className="h-8 flex-1 rounded bg-white/5" />
                  <div className="h-8 flex-1 rounded bg-white/5" />
                </div>
              </div>

              {/* Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold">
                  {website.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {website.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteTypes;
import React from "react";

const websiteTypes = [
  {
    title: "Portfolio",
    description:
      "Personal brands, creative portfolios and professional showcases.",
    className: "md:col-span-2",
    type: "portfolio",
    number: "01",
    label: "CREATIVE / PERSONAL",
  },
  {
    title: "SaaS",
    description:
      "Powerful products, analytics dashboards and web applications.",
    className: "",
    type: "saas",
    number: "02",
    label: "PRODUCT / SOFTWARE",
  },
  {
    title: "Ecommerce",
    description: "Modern storefronts designed to turn visitors into customers.",
    className: "",
    type: "ecommerce",
    number: "03",
    label: "COMMERCE / RETAIL",
  },
  {
    title: "Landing Pages",
    description:
      "High-impact pages that introduce ideas and drive conversions.",
    className: "md:col-span-2",
    type: "landing",
    number: "04",
    label: "MARKETING / GROWTH",
  },
];

const BrowserBar = () => (
  <div className="flex h-9 items-center justify-between border-b border-white/[0.07] px-3">
    <div className="flex items-center gap-1.5">
      <span className="size-2 rounded-full bg-red-400/70" />
      <span className="size-2 rounded-full bg-yellow-400/70" />
      <span className="size-2 rounded-full bg-green-400/70" />
    </div>

    <div className="w-1/2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-center text-[8px] text-gray-500">
      preview.nexora.app
    </div>

    <div className="size-4" />
  </div>
);

// Portfolio Preview
const PortfolioPreview = () => (
  <div className="h-full bg-[#101013] p-5 sm:p-7">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold tracking-widest text-white">
        STUDIO<span className="text-purple-400">.</span>
      </span>

      <div className="flex gap-3 text-[8px] text-gray-500">
        <span>Work</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>

    <div className="mt-9 grid grid-cols-[1.2fr_0.8fr] items-center gap-3">
      <div>
        <p className="text-[8px] uppercase tracking-[0.2em] text-purple-400">
          Independent Designer
        </p>

        <h3 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-3xl">
          Designing
          <br />
          beyond the
          <br />
          <span className="text-gray-500">ordinary.</span>
        </h3>

        <p className="mt-3 max-w-40 text-[8px] leading-relaxed text-gray-500">
          Creating meaningful digital experiences through design and technology.
        </p>

        <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-[8px] font-semibold text-black">
          Explore my work ↗
        </div>
      </div>

      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#292432]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,#a78bfa55,transparent_65%)]" />
        <div className="absolute bottom-0 left-1/2 h-[75%] w-[65%] -translate-x-1/2 rounded-t-full bg-[#75658b]" />
        <div className="absolute bottom-0 left-1/2 h-[48%] w-[80%] -translate-x-1/2 rounded-t-full bg-[#3b3449]" />
        <div className="absolute bottom-3 left-3 text-[8px] text-white/70">
          SELECTED WORK / 2026
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3">
      <span className="text-[8px] text-gray-500">Featured projects</span>
      <span className="text-[8px] text-purple-300">View all ↗</span>
    </div>
  </div>
);

// SaaS Preview
const SaaSPreview = () => (
  <div className="flex h-full bg-[#101013]">
    <div className="hidden w-[27%] flex-col border-r border-white/[0.07] p-3 sm:flex">
      <div className="mb-7 flex items-center gap-1.5 text-[9px] font-semibold text-white">
        <span className="size-3 rounded bg-purple-500" />
        NEXBOARD
      </div>

      {["Overview", "Analytics", "Projects", "Settings"].map((item, i) => (
        <div
          key={item}
          className={`mb-2 rounded-md px-2 py-2 text-[8px] ${
            i === 0 ? "bg-purple-500/15 text-purple-300" : "text-gray-500"
          }`}
        >
          {item}
        </div>
      ))}
    </div>

    <div className="min-w-0 flex-1 p-3 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] text-gray-500">Workspace / Overview</p>
          <h3 className="mt-1 text-sm font-semibold text-white">Dashboard</h3>
        </div>

        <div className="rounded-md bg-purple-500 px-2 py-1 text-[8px] text-white">
          + New Project
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["Revenue", "$24.8k", "+12.8%"],
          ["Users", "8,549", "+8.2%"],
          ["Growth", "24.5%", "+4.6%"],
        ].map(([label, value, growth]) => (
          <div
            key={label}
            className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.025] p-2"
          >
            <p className="truncate text-[7px] text-gray-500">{label}</p>
            <p className="mt-2 truncate text-xs font-semibold text-white">
              {value}
            </p>
            <p className="mt-1 text-[7px] text-green-400">{growth}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.025] p-3">
        <div className="flex justify-between">
          <span className="text-[9px] font-medium text-white">Performance</span>
          <span className="text-[8px] text-gray-500">Last 7 days</span>
        </div>

        <div className="mt-5 flex h-20 items-end gap-2">
          {[35, 52, 43, 75, 55, 85, 65, 95, 72, 88, 63, 100].map(
            (height, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-purple-500/70 transition-colors group-hover:bg-purple-400"
                style={{ height: `${height}%` }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  </div>
);

// Ecommerce Preview
const EcommercePreview = () => (
  <div className="h-full bg-[#f3f0e9] p-4 text-[#24231f] sm:p-5">
    <div className="flex items-center justify-between border-b border-black/10 pb-3">
      <span className="text-xs font-bold tracking-[0.15em]">ATELIER.</span>

      <div className="flex gap-3 text-[8px] text-gray-600">
        <span>Shop</span>
        <span>Collections</span>
        <span>Bag (02)</span>
      </div>
    </div>

    <div className="mt-5 flex items-end justify-between">
      <div>
        <p className="text-[8px] uppercase tracking-[0.2em] text-gray-500">
          New collection / 2026
        </p>
        <h3 className="mt-1 text-lg font-medium sm:text-2xl">
          Everyday
          <br />
          essentials.
        </h3>
      </div>

      <span className="mb-1 text-[8px] text-gray-500">Discover ↗</span>
    </div>

    <div className="mt-4 grid grid-cols-3 gap-2">
      {[
        {
          name: "Form Chair",
          price: "$249",
          bg: "bg-[#c7b9a7]",
          shape: "rounded-t-full",
        },
        {
          name: "Studio Lamp",
          price: "$189",
          bg: "bg-[#b5b6a8]",
          shape: "rounded-full",
        },
        {
          name: "Daily Bag",
          price: "$129",
          bg: "bg-[#d0b5a5]",
          shape: "rounded-xl",
        },
      ].map((product) => (
        <div key={product.name}>
          <div
            className={`relative flex h-24 items-center justify-center overflow-hidden ${product.bg}`}
          >
            <div
              className={`h-[65%] w-[48%] ${product.shape} bg-[#61594f]/60 shadow-lg`}
            />
            <div className="absolute bottom-1.5 right-1.5 rounded-full bg-white/70 px-1.5 py-1 text-[7px]">
              +
            </div>
          </div>

          <p className="mt-2 text-[8px] font-medium">{product.name}</p>
          <p className="mt-0.5 text-[8px] text-gray-500">{product.price}</p>
        </div>
      ))}
    </div>
  </div>
);

// Landing Page Preview
const LandingPreview = () => (
  <div className="h-full bg-[#101013] p-5 sm:p-7">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-white">
        vertex<span className="text-purple-400">.</span>
      </span>

      <div className="flex items-center gap-3 text-[8px] text-gray-500">
        <span>Features</span>
        <span>Pricing</span>
        <span className="rounded-full bg-white px-3 py-1.5 font-medium text-black">
          Get Started
        </span>
      </div>
    </div>

    <div className="mx-auto mt-9 max-w-lg text-center">
      <span className="inline-flex rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-[8px] text-purple-300">
        Introducing the next generation
      </span>

      <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-4xl">
        Work smarter.
        <br />
        <span className="text-gray-500">Build faster.</span>
      </h3>

      <p className="mx-auto mt-3 max-w-xs text-[8px] leading-relaxed text-gray-500 sm:text-[10px]">
        Everything your team needs to move from ideas to meaningful results.
      </p>

      <div className="mt-5 flex justify-center gap-2">
        <span className="rounded-md bg-purple-500 px-4 py-2 text-[8px] font-medium text-white">
          Start building ↗
        </span>
        <span className="rounded-md border border-white/10 px-4 py-2 text-[8px] text-gray-300">
          Learn more
        </span>
      </div>
    </div>

    <div className="mt-8 grid grid-cols-3 gap-2">
      {[
        ["01", "Automate workflows"],
        ["02", "Simplify processes"],
        ["03", "Scale with confidence"],
      ].map(([number, title]) => (
        <div
          key={number}
          className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3"
        >
          <span className="text-[8px] text-purple-400">{number}</span>
          <p className="mt-2 text-[8px] font-medium text-gray-300">{title}</p>
        </div>
      ))}
    </div>
  </div>
);

const previews = {
  portfolio: PortfolioPreview,
  saas: SaaSPreview,
  ecommerce: EcommercePreview,
  landing: LandingPreview,
};

const ShowcasePreview = ({ type }) => {
  const Preview = previews[type];

  return (
    <div className="absolute inset-x-5 top-5 bottom-24 overflow-hidden rounded-xl border border-white/[0.09] bg-[#101013] shadow-2xl transition duration-500 group-hover:-translate-y-1 group-hover:border-purple-400/30 sm:inset-x-7 sm:top-7 sm:bottom-28">
      <BrowserBar />

      <div className="h-[calc(100%-36px)] overflow-hidden">
        <Preview />
      </div>
    </div>
  );
};

const WebsiteTypes = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] bg-[#080809]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-purple-400" />

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400">
                What you can build
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              One idea.
              <br />
              <span className="text-gray-500">Endless possibilities.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
            From personal portfolios to complete digital products, Nexora gives
            your ideas the structure, design and technology to become reality.
          </p>
        </div>

        {/* Website Cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {websiteTypes.map((website) => (
            <div
              key={website.title}
              className={`group relative min-h-[390px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d10] transition-all duration-500 hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-[0_15px_50px_rgba(139,92,246,0.08)] sm:min-h-[430px] ${website.className}`}
            >
              {/* Website Preview */}
              <ShowcasePreview type={website.type} />

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10] to-transparent px-6 pb-6 pt-10 sm:px-7 sm:pb-7">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[9px] font-medium tracking-[0.16em] text-purple-400">
                      {website.number}
                    </span>

                    <span className="text-[8px] tracking-wider text-gray-600">
                      / {website.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {website.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm">
                    {website.description}
                  </p>
                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 group-hover:border-purple-400/40 group-hover:bg-purple-500 group-hover:text-white">
                  <span className="transition-transform duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">
            Your vision isn't limited to templates.
          </p>

          <p className="text-xs font-medium text-gray-300">
            Imagine it. Describe it. Build it with Nexora.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WebsiteTypes;

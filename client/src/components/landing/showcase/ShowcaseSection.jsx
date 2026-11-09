import React from "react";
import ShowcaseCard from "./ShowcaseCard";
import {
  LayoutDashboard,
  Search,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Menu,
  Plus,
} from "lucide-react";

const ShowcaseSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50 sm:text-sm">
          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
          BUILT FOR ANY IDEA
        </div>

        <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          One idea.
          <span className="text-purple-400"> Endless possibilities.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          From ambitious startups to personal portfolios and online stores,
          Nexora helps transform your ideas into polished digital experiences.
        </p>
      </div>

      {/* Showcase Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 01 — SaaS Dashboard */}
        <ShowcaseCard
          number="01"
          category="PRODUCT EXPERIENCE"
          title="SaaS Platforms"
          description="Create powerful software interfaces with analytics, dashboards, and structured data experiences."
        >
          <div className="flex min-h-[290px]">
            {/* Sidebar */}
            <aside className="hidden w-[125px] shrink-0 border-r border-white/[0.07] bg-[#0c0c10] p-3 sm:block">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-purple-400/15">
                  <LayoutDashboard className="size-3.5 text-purple-300" />
                </div>

                <span className="text-[10px] font-semibold text-white/80">
                  Orbit
                </span>
              </div>

              <div className="mt-7 space-y-2">
                {["Overview", "Analytics", "Customers", "Reports"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`rounded-md px-2 py-2 text-[9px] ${
                        index === 0
                          ? "bg-purple-400/10 text-purple-300"
                          : "text-white/35"
                      }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="mt-10 border-t border-white/[0.07] pt-3">
                <div className="flex items-center gap-2">
                  <Settings className="size-3 text-white/30" />
                  <span className="text-[9px] text-white/35">Settings</span>
                </div>
              </div>
            </aside>

            {/* Dashboard Content */}
            <div className="min-w-0 flex-1 p-3 sm:p-4">
              {/* Topbar */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[9px] text-white/35">
                    WORKSPACE / OVERVIEW
                  </p>

                  <h4 className="mt-1 text-sm font-semibold text-white">
                    Dashboard
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-md border border-white/10">
                    <Search className="size-3 text-white/40" />
                  </div>

                  <div className="flex size-7 items-center justify-center rounded-md border border-white/10">
                    <Bell className="size-3 text-white/40" />
                  </div>

                  <div className="size-7 rounded-full bg-purple-400/20" />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ["Revenue", "$24,680", "+12.8%"],
                  ["Customers", "1,284", "+8.2%"],
                  ["Conversion", "4.82%", "+2.4%"],
                ].map(([label, value, growth]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.025] p-2 sm:p-3"
                  >
                    <p className="truncate text-[8px] text-white/35 sm:text-[9px]">
                      {label}
                    </p>

                    <p className="mt-2 truncate text-xs font-semibold text-white sm:text-sm">
                      {value}
                    </p>

                    <p className="mt-1 text-[8px] text-green-400">{growth}</p>
                  </div>
                ))}
              </div>

              {/* Revenue Chart */}
              <div className="mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-white/40">REVENUE OVERVIEW</p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      $18,420.00
                    </p>
                  </div>

                  <span className="rounded-md bg-green-400/10 px-2 py-1 text-[8px] text-green-300">
                    +18.6%
                  </span>
                </div>

                <div className="mt-4 flex h-20 items-end gap-2">
                  {[35, 55, 43, 75, 60, 90, 68, 100, 76, 88, 65, 95].map(
                    (height, index) => (
                      <div key={index} className="flex h-full flex-1 items-end">
                        <div
                          className={`w-full rounded-t-sm ${
                            index === 7 ? "bg-purple-400" : "bg-purple-400/25"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-2 flex justify-between text-[8px] text-white/25">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        {/* 02 — Creative Portfolio */}
        <ShowcaseCard
          number="02"
          category="CREATIVE EXPERIENCE"
          title="Creative Portfolios"
          description="Present your work through expressive layouts, strong typography, and carefully designed project showcases."
        >
          <div className="min-h-[290px] bg-[#151319] p-4 sm:p-5">
            {/* Portfolio Navbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold tracking-widest text-white">
                ALEX MORGAN<span className="text-purple-400">.</span>
              </span>

              <div className="hidden items-center gap-4 text-[9px] text-white/45 sm:flex">
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
              </div>

              <Menu className="size-4 text-white/50 sm:hidden" />
            </div>

            {/* Portfolio Hero */}
            <div className="grid grid-cols-[1fr_100px] items-center gap-3 py-7 sm:grid-cols-[1fr_140px]">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-purple-300">
                  Independent Designer
                </p>

                <h4 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  Designing
                  <br />
                  beyond the
                  <br />
                  <span className="text-purple-300">ordinary.</span>
                </h4>

                <p className="mt-3 max-w-[190px] text-[9px] leading-4 text-white/40">
                  Creating thoughtful digital experiences through design and
                  technology.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[9px] font-medium text-black">
                  Explore my work
                  <ArrowUpRight className="size-3" />
                </div>
              </div>

              <div className="relative h-32 overflow-hidden rounded-lg border border-white/10 bg-[#29222f] sm:h-40">
                <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/50 bg-purple-400/20 sm:size-28" />

                <div className="absolute bottom-0 left-0 h-2/3 w-1/2 bg-[#7c568f]/60" />

                <div className="absolute right-0 top-0 h-3/4 w-1/2 bg-[#b29ac2]/30" />
              </div>
            </div>

            {/* Projects */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-[10px] font-semibold text-white/80">
                Selected projects
              </span>

              <span className="text-[9px] text-white/35">2024 — 2026</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="overflow-hidden rounded-md">
                <div className="flex h-16 items-center justify-center bg-[#39304b]">
                  <div className="size-8 rotate-45 border border-purple-200/70" />
                </div>

                <p className="mt-2 text-[8px] text-white/70">Brand identity</p>
              </div>

              <div className="overflow-hidden rounded-md">
                <div className="flex h-16 items-center justify-center bg-[#34434a]">
                  <div className="h-10 w-7 rounded-full border border-white/50" />
                </div>

                <p className="mt-2 text-[8px] text-white/70">Digital product</p>
              </div>

              <div className="overflow-hidden rounded-md">
                <div className="flex h-16 items-center justify-center bg-[#514039]">
                  <div className="size-8 rounded-lg border border-orange-200/60" />
                </div>

                <p className="mt-2 text-[8px] text-white/70">Art direction</p>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        {/* 03 — Ecommerce */}
        <ShowcaseCard
          number="03"
          category="COMMERCE EXPERIENCE"
          title="Ecommerce Stores"
          description="Design polished storefronts with product discovery, organized collections, and shopping-focused layouts."
        >
          <div className="min-h-[290px] bg-[#f3f0e9] p-4 text-[#24231f] sm:p-5">
            {/* Store Navbar */}
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <span className="text-sm font-bold tracking-[0.15em]">
                FORM<span className="text-[#9a7651]">/</span>STUDIO
              </span>

              <div className="hidden items-center gap-4 text-[9px] text-black/60 sm:flex">
                <span>New arrivals</span>
                <span>Collection</span>
                <span>About</span>
              </div>

              <div className="flex items-center gap-2">
                <Search className="size-3.5" />
                <ShoppingBag className="size-3.5" />
              </div>
            </div>

            {/* Store Heading */}
            <div className="py-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/45">
                The essentials collection
              </p>

              <h4 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Objects made
                <br />
                for everyday life.
              </h4>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-[9px] text-black/50">
                  Thoughtful design. Timeless utility.
                </p>

                <span className="flex items-center gap-1 text-[9px] font-semibold">
                  Shop collection
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  name: "Studio Chair",
                  price: "$249",
                  color: "bg-[#c9bba7]",
                  shape: "h-11 w-10 rounded-t-xl",
                },
                {
                  name: "Daily Tote",
                  price: "$89",
                  color: "bg-[#b3b8a6]",
                  shape: "h-12 w-9 rounded-t-lg",
                },
                {
                  name: "Ceramic Set",
                  price: "$64",
                  color: "bg-[#c5aaa0]",
                  shape: "h-10 w-10 rounded-full",
                },
              ].map((product) => (
                <div key={product.name} className="min-w-0">
                  <div
                    className={`flex h-24 items-center justify-center rounded-md ${product.color}`}
                  >
                    <div
                      className={`${product.shape} border border-black/10 bg-white/20 shadow-sm`}
                    />
                  </div>

                  <p className="mt-2 truncate text-[9px] font-medium">
                    {product.name}
                  </p>

                  <p className="mt-1 text-[9px] text-black/50">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
              <span className="text-[8px] tracking-wider text-black/40">
                DESIGNED TO LAST
              </span>

              <span className="text-[8px] text-black/40">
                DISCOVER THE COLLECTION →
              </span>
            </div>
          </div>
        </ShowcaseCard>

        {/* 04 — Startup Website */}
        <ShowcaseCard
          number="04"
          category="STARTUP EXPERIENCE"
          title="Startup Websites"
          description="Introduce your product with clear messaging, strong positioning, and conversion-focused landing pages."
        >
          <div className="min-h-[290px] bg-[#10121b] p-4 sm:p-5">
            {/* Startup Navbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-purple-400/20">
                  <SparklesIcon />
                </div>

                <span className="text-xs font-semibold text-white">LUMIO</span>
              </div>

              <div className="hidden items-center gap-4 text-[9px] text-white/45 sm:flex">
                <span>Product</span>
                <span>Solutions</span>
                <span>Pricing</span>
              </div>

              <span className="rounded-md bg-white px-3 py-2 text-[9px] font-medium text-black">
                Get started
              </span>
            </div>

            {/* Startup Hero */}
            <div className="relative mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#171a28] p-4 sm:p-5">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-purple-500/15 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-400/10 px-2.5 py-1 text-[8px] text-purple-200">
                  <span className="size-1.5 rounded-full bg-purple-300" />A
                  BETTER WAY TO WORK
                </span>

                <h4 className="mt-4 max-w-[260px] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Work smarter.
                  <br />
                  <span className="text-purple-300">Move faster.</span>
                </h4>

                <p className="mt-3 max-w-[240px] text-[9px] leading-5 text-white/45">
                  Bring your team's workflow together in one intelligent
                  workspace.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-md bg-purple-400 px-3 py-2 text-[9px] font-semibold text-black">
                    Start building
                  </span>

                  <span className="text-[9px] text-white/55">
                    Explore product →
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-lg border border-white/[0.07] bg-white/[0.02] py-4">
              {[
                ["10k+", "Active users"],
                ["99.9%", "Uptime"],
                ["24/7", "Availability"],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-semibold text-white">{value}</p>

                  <p className="mt-1 text-[8px] text-white/35">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </section>
  );
};

// Small reusable visual mark for the startup preview.
const SparklesIcon = () => <Plus className="size-3.5 text-purple-300" />;

export default ShowcaseSection;

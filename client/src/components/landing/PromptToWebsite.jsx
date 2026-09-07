import React from "react";
import { ArrowDown, Check, Sparkles } from "lucide-react";

const PromptToWebsite = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
          The Nexora experience
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          From prompt to pixel.
        </h2>

        <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
          Your idea is all Nexora needs. Describe it naturally and watch your
          website take shape.
        </p>
      </div>

      {/* Main Visual */}
      <div className="relative mt-16">
        {/* Purple glow */}
        <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative grid gap-5 lg:grid-cols-[0.8fr_0.2fr_1.2fr] lg:items-center">

          {/* Prompt */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10">
                <Sparkles className="size-4 text-purple-400" />
              </div>

              <span className="text-sm font-medium text-white/70">
                Your prompt
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm leading-6 text-white/70">
                "Build a modern analytics dashboard for a SaaS company with
                revenue charts, user statistics, and a dark premium design."
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
              <span className="size-1.5 rounded-full bg-green-400" />
              Ready to generate
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <ArrowDown className="size-5 text-purple-400 lg:rotate-[-90deg]" />
            </div>
          </div>

          {/* Generated Website */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] shadow-2xl">
            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-400/70" />
              <span className="size-2.5 rounded-full bg-green-500/70" />

              <div className="ml-3 h-5 flex-1 rounded-md bg-white/[0.04]" />
            </div>

            {/* Website */}
            <div className="p-5 sm:p-7">

              {/* Website navbar */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 rounded bg-white/20" />

                <div className="hidden gap-3 sm:flex">
                  <div className="h-2 w-10 rounded bg-white/10" />
                  <div className="h-2 w-10 rounded bg-white/10" />
                  <div className="h-2 w-10 rounded bg-white/10" />
                </div>

                <div className="h-7 w-16 rounded-md bg-purple-500/20" />
              </div>

              {/* Dashboard heading */}
              <div className="mt-8">
                <div className="h-5 w-36 rounded bg-white/20" />

                <div className="mt-2 h-2.5 w-52 rounded bg-white/10" />
              </div>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="h-2 w-12 rounded bg-white/10" />
                  <div className="mt-3 h-4 w-16 rounded bg-white/20" />
                  <div className="mt-2 h-1.5 w-10 rounded bg-green-400/30" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="h-2 w-12 rounded bg-white/10" />
                  <div className="mt-3 h-4 w-16 rounded bg-white/20" />
                  <div className="mt-2 h-1.5 w-10 rounded bg-purple-400/30" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="h-2 w-12 rounded bg-white/10" />
                  <div className="mt-3 h-4 w-16 rounded bg-white/20" />
                  <div className="mt-2 h-1.5 w-10 rounded bg-blue-400/30" />
                </div>
              </div>

              {/* Chart */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-20 rounded bg-white/10" />
                  <div className="h-2 w-12 rounded bg-white/5" />
                </div>

                <div className="mt-6 flex h-24 items-end gap-2">
                  <div className="h-[35%] flex-1 rounded-t bg-purple-400/20" />
                  <div className="h-[50%] flex-1 rounded-t bg-purple-400/30" />
                  <div className="h-[42%] flex-1 rounded-t bg-purple-400/25" />
                  <div className="h-[68%] flex-1 rounded-t bg-purple-400/40" />
                  <div className="h-[58%] flex-1 rounded-t bg-purple-400/35" />
                  <div className="h-[82%] flex-1 rounded-t bg-purple-400/60" />
                  <div className="h-full flex-1 rounded-t bg-purple-400/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Processing Steps */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
            <Check className="size-3 text-green-400" />
            Understanding prompt
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
            <Check className="size-3 text-green-400" />
            Planning layout
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
            <Check className="size-3 text-green-400" />
            Generating components
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptToWebsite;
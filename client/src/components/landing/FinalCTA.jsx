import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
          <Sparkles className="size-4" />
          Build without limits
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Your next website starts with an idea.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Describe what you want to create and let Nexora transform your idea
          into a website you can refine, control, and launch.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
          >
            Start Building Free
            <ArrowRight className="size-4" />
          </Link>

          <Link
            to="/login"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium transition hover:bg-white/[0.05] sm:w-auto"
          >
            Log in to Nexora
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-xs text-white/30">
          Start with an idea. Take control of every detail.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
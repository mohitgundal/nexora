import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Check, Globe, Users, Palette, Layers } from "lucide-react";

const Hero = () => {
  const stages = [
    "Describe your idea",
    "Configure requirements",
    "Review website plan",
    "Generate website",
  ];

  const description =
    "Build a modern website for a digital agency offering creative services to businesses.";

  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState("");

  // Move through the four stages automatically.
  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStage((previous) => (previous + 1) % stages.length);
    }, 5000);

    return () => clearInterval(stageInterval);
  }, []);

  // Type the description during the first stage.
  useEffect(() => {
    if (stage !== 0) {
      setTypedText("");
      return;
    }

    let index = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      index++;
      setTypedText(description.slice(0, index));

      if (index >= description.length) {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [stage]);

  const selectedFeatures = ["Contact forms", "Analytics", "Search"];

  return (
    <section className="mx-auto mt-8 max-w-7xl sm:mt-12">
      <div className="flex flex-col items-center gap-12 px-4 sm:px-6 md:px-8 lg:flex-row lg:gap-16">
        {/* Left Section */}
        <div className="w-full max-w-2xl flex-1">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-3 py-2 text-xs text-gray-400 sm:px-4 sm:text-sm">
            <span className="size-2 animate-pulse rounded-full bg-green-500" />
            AI Powered Website Builder
          </div>

          <h1 className="my-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="block animate-reveal-line-1">The Web,</span>
            </span>

            <span className="block overflow-hidden">
              <span className="block animate-reveal-line-2">At the Speed</span>
            </span>

            <span className="block overflow-hidden">
              <span className="block animate-reveal-line-3">of Thought.</span>
            </span>
          </h1>

          <p className="max-w-2xl py-2 text-base leading-7 text-gray-400 sm:text-lg lg:text-xl">
            Describe what you want. Nexora designs, develops, and evolves your
            website around your vision.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/register"
              className="rounded-sm bg-white px-6 py-3 text-center text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="rounded-sm border border-white/20 px-6 py-3 text-center text-sm transition hover:bg-white/10"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex w-full flex-1 items-center justify-center">
          {/* Purple Glow */}
          <div className="absolute h-64 w-64 rounded-full bg-purple-500/20 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

          {/* Browser Box */}
          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/20 bg-white/5 p-2 shadow-2xl sm:rounded-2xl sm:p-3">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]">
              {/* Browser Header */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4">
                <div className="size-2.5 rounded-full bg-red-500/90 sm:size-3" />
                <div className="size-2.5 rounded-full bg-yellow-400/90 sm:size-3" />
                <div className="size-2.5 rounded-full bg-green-500/90 sm:size-3" />

                <div className="ml-3 flex-1 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-center text-[10px] text-white/30">
                  nexora.ai / builder
                </div>
              </div>

              {/* Stage Navigation */}
              <div className="flex items-center justify-between gap-1 border-b border-white/5 px-3 py-4 sm:px-5">
                {stages.map((item, index) => (
                  <div
                    key={item}
                    className="flex min-w-0 flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className={`flex size-7 items-center justify-center rounded-full border text-[10px] transition-all duration-500 sm:size-8 ${
                        stage >= index
                          ? "border-purple-400 bg-purple-400/15 text-purple-300"
                          : "border-white/10 text-white/30"
                      }`}
                    >
                      {stage > index ? (
                        <Check className="size-3.5" />
                      ) : (
                        `0${index + 1}`
                      )}
                    </div>

                    <span
                      className={`hidden text-center text-[9px] transition-colors sm:block ${
                        stage === index ? "text-purple-300" : "text-white/30"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Animation Content */}
              <div className="min-h-[340px] p-4 sm:min-h-[365px] sm:p-6">
                {/* Stage Heading */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-xs text-purple-300">
                    <Sparkles className="size-3.5" />
                    NEXORA AI BUILDER
                  </div>

                  <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                    {stages[stage]}
                  </h3>

                  <p className="mt-1 text-xs text-white/35">
                    {stage === 0 &&
                      "Start with a simple description of your idea."}
                    {stage === 1 && "Define the experience your website needs."}
                    {stage === 2 &&
                      "Your idea, organized into a website structure."}
                    {stage === 3 && "Your website is ready to take shape."}
                  </p>
                </div>

                {/* Stage 1: Describe */}
                {stage === 0 && (
                  <div className="animate-prompt-glow rounded-xl border border-purple-400/30 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-white/30">
                      Project description
                    </p>

                    <p className="mt-3 min-h-[105px] text-xs leading-6 text-white/75 sm:text-sm">
                      {typedText}
                      <span className="ml-1 inline-block h-4 w-0.5 animate-cursor bg-purple-400 align-middle" />
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[10px] text-white/30">
                        Describe your vision
                      </span>

                      <span className="rounded-md bg-purple-400/15 px-3 py-1.5 text-[10px] text-purple-300">
                        Continue →
                      </span>
                    </div>
                  </div>
                )}

                {/* Stage 2: Requirements */}
                {stage === 1 && (
                  <div className="animate-prompt-glow space-y-4">
                    {/* Audience */}
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
                        <Users className="size-3.5" />
                        TARGET AUDIENCE
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {["Consumers", "Businesses"].map((item, index) => (
                          <span
                            key={item}
                            className={`rounded-lg border px-3 py-2 text-[10px] ${
                              index === 1
                                ? "border-purple-400/50 bg-purple-400/10 text-purple-200"
                                : "border-white/10 text-white/35"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Style */}
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
                        <Palette className="size-3.5" />
                        VISUAL STYLE
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {["Modern", "Minimal", "Bold", "Professional"].map(
                          (item) => (
                            <span
                              key={item}
                              className={`rounded-lg border px-3 py-2 text-[10px] ${
                                item === "Modern"
                                  ? "border-purple-400/50 bg-purple-400/10 text-purple-200"
                                  : "border-white/10 text-white/35"
                              }`}
                            >
                              {item}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
                        <Layers className="size-3.5" />
                        SELECTED FEATURES
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {selectedFeatures.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-400/30 bg-purple-400/10 px-2.5 py-2 text-[10px] text-purple-200"
                          >
                            <Check className="size-3" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 3: Website Plan */}
                {stage === 2 && (
                  <div className="animate-prompt-glow rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white/80">
                        Website structure
                      </span>

                      <span className="rounded-full bg-green-400/10 px-2 py-1 text-[9px] text-green-300">
                        Plan ready
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {[
                        ["01", "Home", "Hero, Services, Testimonials"],
                        ["02", "About", "Story, Team, Mission"],
                        ["03", "Services", "Offerings, Process, Benefits"],
                        ["04", "Contact", "Contact form, Information"],
                      ].map(([number, name, detail]) => (
                        <div
                          key={number}
                          className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3"
                        >
                          <span className="text-[10px] text-purple-300">
                            {number}
                          </span>

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white/80">
                              {name}
                            </p>

                            <p className="mt-1 truncate text-[9px] text-white/30">
                              {detail}
                            </p>
                          </div>

                          <Check className="ml-auto size-3.5 shrink-0 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 4: Generated Website */}
                {stage === 3 && (
                  <div className="animate-prompt-glow overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
                    {/* Preview Navbar */}
                    <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
                      <div className="h-2.5 w-20 rounded bg-white/70" />

                      <div className="flex gap-2">
                        <div className="h-1.5 w-8 rounded bg-white/20" />
                        <div className="h-1.5 w-8 rounded bg-white/20" />
                        <div className="h-1.5 w-8 rounded bg-white/20" />
                      </div>
                    </div>

                    {/* Preview Hero */}
                    <div className="px-4 py-6 text-center sm:px-8 sm:py-8">
                      <div className="mx-auto h-2 w-16 rounded bg-purple-400/50" />

                      <div className="mx-auto mt-4 h-4 w-3/4 rounded bg-white/80" />

                      <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-white/20" />

                      <div className="mx-auto mt-5 h-7 w-24 rounded-md bg-purple-400/80" />

                      {/* Preview Cards */}
                      <div className="mt-7 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] p-2"
                          >
                            <div className="h-9 rounded bg-purple-400/10" />

                            <div className="mt-3 h-2 w-3/4 rounded bg-white/30" />

                            <div className="mt-2 h-1.5 w-full rounded bg-white/10" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-green-400/[0.05] py-3">
                      <span className="size-1.5 rounded-full bg-green-400" />

                      <span className="text-[10px] text-green-300">
                        Website preview generated
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Status */}
              <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 sm:px-6">
                <span className="text-[10px] text-white/30">
                  Nexora AI · Website creation
                </span>

                <span className="text-[10px] text-purple-300">
                  STEP 0{stage + 1} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

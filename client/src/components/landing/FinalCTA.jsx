import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

const FinalCTA = () => {
  const steps = [
    {
      number: "01",
      title: "Define your requirements",
      description: "Tell Nexora what your website needs.",
    },
    {
      number: "02",
      title: "Review your website plan",
      description: "Understand the structure before generation.",
    },
    {
      number: "03",
      title: "Build and refine",
      description: "Generate your website and take control.",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Main CTA Container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0f]">
          {/* Subtle background lighting */}
          <div className="pointer-events-none absolute -right-40 -top-40 size-[450px] rounded-full bg-purple-500/[0.07] blur-[120px]" />

          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-400/[0.08]">
                  <Sparkles className="size-4 text-purple-300" />
                </div>

                <span className="text-xs font-medium uppercase tracking-[0.18em] text-purple-300">
                  Your next project starts here
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-8 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[58px]">
                Have a vision?
                <span className="mt-2 block text-white/45">
                  Let's build it with Nexora.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
                Bring your website idea to life through a more structured
                approach to AI development. Define what you need, review the
                plan, and create with confidence.
              </p>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/85"
                >
                  Start your project
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] px-6 py-3.5 text-sm font-medium text-white/75 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
                >
                  Sign in to Nexora
                </Link>
              </div>

              {/* Supporting note */}
              <div className="mt-8 flex items-center gap-2 text-xs text-white/35">
                <Check className="size-3.5 text-purple-300/70" />
                <span>
                  Your project. Your decisions. Your creative control.
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative flex items-center border-t border-white/[0.08] bg-white/[0.015] px-7 py-12 sm:px-12 lg:border-l lg:border-t-0 lg:px-12 lg:py-16">
              <div className="w-full">
                {/* Right Heading */}
                <div className="mb-8">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                    A more considered workflow
                  </p>

                  <h3 className="mt-3 text-xl font-medium tracking-tight text-white">
                    From requirements to reality.
                  </h3>
                </div>

                {/* Steps */}
                <div className="space-y-0">
                  {steps.map((step, index) => (
                    <div
                      key={step.number}
                      className="group relative flex gap-5 border-t border-white/[0.08] py-6 last:border-b"
                    >
                      {/* Number */}
                      <span className="pt-0.5 font-mono text-xs text-purple-300/65">
                        {step.number}
                      </span>

                      {/* Step Content */}
                      <div>
                        <h4 className="text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                          {step.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-6 text-white/40">
                          {step.description}
                        </p>
                      </div>

                      {/* Completion indicator */}
                      <div className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/25 transition-colors group-hover:border-purple-400/30 group-hover:text-purple-300">
                        <Check className="size-3.5" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom detail */}
                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
                    Built around your vision
                  </span>

                  <span className="text-xs font-semibold tracking-wider text-white/35">
                    NEXORA<span className="text-purple-300">.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brand Detail */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/30">
            The next step in your website creation journey.
          </p>

          <p className="text-xs text-white/25">
            Powered by a more thoughtful approach to AI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

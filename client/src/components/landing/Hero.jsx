import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const prompts = [
    "Create a modern landing page for an AI startup with a dark futuristic design.",

    "Build a premium portfolio website for a creative designer with bold typography.",

    "Design a clean SaaS dashboard with analytics, charts, and user management.",

    "Create a stylish ecommerce homepage for a futuristic fashion brand.",
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const currentPrompt = prompts[promptIndex];

    setTypedText("");
    setIsTyping(true);
    setShowCards(false);

    let currentIndex = 0;

    let cardsTimeout;
    let promptTimeout;

    const typingInterval = setInterval(() => {
      currentIndex++;

      setTypedText(currentPrompt.slice(0, currentIndex));

      if (currentIndex >= currentPrompt.length) {
        clearInterval(typingInterval);

        setIsTyping(false);

        cardsTimeout = setTimeout(() => {
          setShowCards(true);
        }, 1000);

        promptTimeout = setTimeout(() => {
          setPromptIndex((previousIndex) => {
            return (previousIndex + 1) % prompts.length;
          });
        }, 4000);
      }
    }, 35);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(cardsTimeout);
      clearTimeout(promptTimeout);
    };
  }, [promptIndex]);

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
              <div className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4">
                <div className="size-2.5 rounded-full bg-red-500/90 shadow-lg shadow-red-500/30 sm:size-3" />

                <div className="size-2.5 rounded-full bg-yellow-400/90 shadow-lg shadow-yellow-400/30 sm:size-3" />

                <div className="size-2.5 rounded-full bg-green-500/90 shadow-lg shadow-green-500/30 sm:size-3" />
              </div>

              {/* Prompt */}
              <div className="animate-prompt-glow mx-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:mx-4 sm:p-5">
                <p className="text-xs uppercase tracking-wider text-white/30">
                  Your prompt
                </p>

                <p className="mt-3 min-h-20 text-xs leading-6 text-white/70 sm:min-h-16 sm:text-sm">
                  "{typedText}"
                  {isTyping && (
                    <span className="ml-1 inline-block h-4 w-0.5 animate-cursor bg-purple-400" />
                  )}
                </p>
              </div>

              {/* Generated Website */}
              <div className="min-h-72 p-4 sm:p-6">
                <div className="h-5 w-32 rounded bg-white/10" />

                <div className="mt-8 h-8 w-3/4 rounded bg-white/10" />

                <div className="mt-3 h-4 w-1/2 rounded bg-white/5" />

                <div className="mt-8">
                  {!showCards ? (
                    /* Loader */
                    <div className="flex h-24 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="size-2 animate-loader-dot-1 rounded-full bg-purple-400" />

                          <span className="size-2 animate-loader-dot-2 rounded-full bg-purple-400" />

                          <span className="size-2 animate-loader-dot-3 rounded-full bg-purple-400" />
                        </div>

                        <span className="text-xs tracking-wide text-white/40">
                          Generating your website...
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Generated Cards */
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {/* Card 1 */}
                      <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2 sm:h-24 sm:p-3">
                        <div className="mb-3 size-6 rounded-md bg-purple-500/20 sm:size-7" />

                        <div className="h-2 w-10 rounded bg-white/20 sm:w-12" />

                        <div className="mt-2 h-1.5 w-12 rounded bg-white/10 sm:w-16" />

                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
                      </div>

                      {/* Card 2 */}
                      <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2 sm:h-24 sm:p-3">
                        <div className="flex gap-1">
                          <div className="h-4 flex-1 rounded bg-blue-400/20 sm:h-5" />

                          <div className="h-4 flex-1 rounded bg-purple-400/20 sm:h-5" />
                        </div>

                        <div className="mt-3 h-2 w-10 rounded bg-white/20 sm:w-14" />

                        <div className="mt-2 h-1.5 w-8 rounded bg-white/10 sm:w-10" />
                      </div>

                      {/* Card 3 */}
                      <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2 sm:h-24 sm:p-3">
                        <div className="flex h-7 items-end gap-1">
                          <div className="h-3 w-2 rounded-t bg-purple-400/30" />

                          <div className="h-5 w-2 rounded-t bg-purple-400/50" />

                          <div className="h-7 w-2 rounded-t bg-purple-400/80" />

                          <div className="h-4 w-2 rounded-t bg-purple-400/40" />
                        </div>

                        <div className="mt-3 h-2 w-10 rounded bg-white/20 sm:w-12" />

                        <div className="mt-2 h-1.5 w-12 rounded bg-white/10 sm:w-16" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

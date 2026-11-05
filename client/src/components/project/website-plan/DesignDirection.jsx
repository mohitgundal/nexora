import React from "react";
import {
  Palette,
  Type,
  Layout,
  Sparkles,
} from "lucide-react";

const designData = {
  modern: {
    title: "Modern Design System",
    description:
      "A polished visual direction focused on clarity, hierarchy, contemporary layouts, and refined interaction details.",
    principles: [
      "Clean layout hierarchy",
      "Strong typography",
      "Purposeful spacing",
      "Polished interactions",
    ],
  },

  minimal: {
    title: "Minimal Design System",
    description:
      "A focused and spacious interface that removes unnecessary visual noise and keeps attention on the core content.",
    principles: [
      "Generous whitespace",
      "Simple components",
      "Focused content",
      "Limited visual noise",
    ],
  },

  bold: {
    title: "Bold Design System",
    description:
      "An expressive direction with strong visual hierarchy, impactful typography, and confident design elements.",
    principles: [
      "Large typography",
      "Strong visual hierarchy",
      "Expressive components",
      "High-impact layouts",
    ],
  },

  professional: {
    title: "Professional Design System",
    description:
      "A trustworthy and structured visual direction designed to communicate credibility and clarity.",
    principles: [
      "Structured layouts",
      "Clear information hierarchy",
      "Trust-focused elements",
      "Consistent components",
    ],
  },

  futuristic: {
    title: "Futuristic Design System",
    description:
      "A technology-driven visual language using immersive layouts, refined contrast, and modern interaction patterns.",
    principles: [
      "Technology-focused visuals",
      "Immersive layouts",
      "Refined motion",
      "Distinctive interface details",
    ],
  },
};

const DesignDirection = ({ style }) => {
  const design = designData[style] || designData.modern;

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-purple-300">
        DESIGN DIRECTION
      </p>

      <h2 className="mt-3 text-2xl font-semibold">
        {design.title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
        {design.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Palette className="size-5 text-purple-300" />

          <p className="mt-5 text-sm font-medium">
            Visual Identity
          </p>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Colors and visual elements will support the selected design
            direction.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Type className="size-5 text-purple-300" />

          <p className="mt-5 text-sm font-medium">
            Typography
          </p>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Typography will establish hierarchy and improve readability.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Layout className="size-5 text-purple-300" />

          <p className="mt-5 text-sm font-medium">
            Layout System
          </p>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Sections will be structured around a clear visitor journey.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Sparkles className="size-5 text-purple-300" />

          <p className="mt-5 text-sm font-medium">
            Interactions
          </p>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Motion and interaction will support usability rather than act as
            decoration.
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-purple-400/15 bg-purple-400/[0.04] p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-purple-300/70">
          Design Principles
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {design.principles.map((principle) => (
            <span
              key={principle}
              className="rounded-lg border border-purple-400/15 bg-black/20 px-3 py-2 text-xs text-white/60"
            >
              {principle}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignDirection;
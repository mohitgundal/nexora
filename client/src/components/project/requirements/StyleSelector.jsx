import React from "react";
import {
  Sparkles,
  Layers,
  Palette,
  Circle,
  WandSparkles,
} from "lucide-react";

const styles = [
  {
    id: "modern",
    title: "Modern",
    description: "Clean layouts, strong typography, and polished visuals.",
    icon: Sparkles,
  },
  {
    id: "minimal",
    title: "Minimal",
    description: "Simple, focused, and spacious.",
    icon: Circle,
  },
  {
    id: "bold",
    title: "Bold",
    description: "Strong colors, large elements, and expressive design.",
    icon: Palette,
  },
  {
    id: "professional",
    title: "Professional",
    description: "Trustworthy, structured, and business focused.",
    icon: Layers,
  },
  {
    id: "futuristic",
    title: "Futuristic",
    description: "Experimental visuals with a technology-driven feel.",
    icon: WandSparkles,
  },
];

const StyleSelector = ({ value, onChange }) => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          What visual direction do you prefer?
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Choose the overall design direction for your website.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {styles.map((style) => {
          const Icon = style.icon;

          const isSelected = value === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange(style.id)}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-purple-400/60 bg-purple-400/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-purple-400/15 text-purple-300"
                    : "bg-white/[0.04] text-white/40"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div>
                <h3 className="text-sm font-medium">
                  {style.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {style.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
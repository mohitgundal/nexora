import React from "react";
import { Check } from "lucide-react";

const features = [
  "Contact forms",
  "User authentication",
  "Dashboard",
  "Blog",
  "Payments",
  "Analytics",
  "Search",
  "Booking system",
  "User profiles",
  "Email integration",
];

const FeatureSelector = ({ value, onChange }) => {
  const toggleFeature = (feature) => {
    if (value.includes(feature)) {
      onChange(value.filter((item) => item !== feature));
    } else {
      onChange([...value, feature]);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          What features might you need?
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Select anything relevant. You can always add more later.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {features.map((feature) => {
          const isSelected = value.includes(feature);

          return (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                isSelected
                  ? "border-purple-400/50 bg-purple-400/10 text-purple-200"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {isSelected && (
                <Check className="size-4 text-purple-400" />
              )}

              {feature}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSelector;
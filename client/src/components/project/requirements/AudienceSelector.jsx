import React from "react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  ShoppingBag,
  Globe,
} from "lucide-react";

const audiences = [
  {
    id: "general",
    title: "General audience",
    description: "Anyone interested in your product or idea.",
    icon: Globe,
  },
  {
    id: "consumers",
    title: "Consumers",
    description: "People looking for products or services.",
    icon: Users,
  },
  {
    id: "businesses",
    title: "Businesses",
    description: "Companies and professional organizations.",
    icon: BriefcaseBusiness,
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Large organizations and teams.",
    icon: Building2,
  },
  {
    id: "students",
    title: "Students",
    description: "Learners, educators, and academic users.",
    icon: GraduationCap,
  },
  {
    id: "customers",
    title: "Existing customers",
    description: "People already familiar with your business.",
    icon: ShoppingBag,
  },
];

const AudienceSelector = ({ value, onChange }) => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Who is this website for?
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Understanding your audience helps Nexora design the right experience.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {audiences.map((audience) => {
          const Icon = audience.icon;

          const isSelected = value === audience.id;

          return (
            <button
              key={audience.id}
              type="button"
              onClick={() => onChange(audience.id)}
              className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-purple-400/60 bg-purple-400/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-purple-400/15 text-purple-300"
                    : "bg-white/[0.05] text-white/40"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div>
                <h3 className="text-sm font-medium">
                  {audience.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {audience.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute right-3 top-3 size-2 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AudienceSelector;
import React from "react";
import {
  FolderKanban,
  Sparkles,
  Globe,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "0",
    icon: FolderKanban,
  },
  {
    title: "AI Generations",
    value: "0",
    icon: Sparkles,
  },
  {
    title: "Live Websites",
    value: "0",
    icon: Globe,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/40">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {stat.value}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-500/10">
                <Icon className="size-5 text-purple-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
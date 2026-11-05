import React from "react";
import { CheckCircle2, Plus } from "lucide-react";

const FeaturePlan = ({ features }) => {
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-300">
            FEATURE PLAN
          </p>

          <h2 className="mt-3 text-2xl font-semibold">Planned functionality</h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
            These features will be considered during website generation based on
            the requirements you selected.
          </p>
        </div>

        <div className="text-sm text-white/30">{features.length} selected</div>
      </div>

      {features.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.name || index}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-purple-400/10">
                <CheckCircle2 className="size-4 text-purple-300" />
              </div>

              <div>
                <p className="text-sm font-medium">{feature.name}</p>

                <p className="mt-1 text-xs text-white/35">
                  Included in the generation plan
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
          <Plus className="mx-auto size-6 text-white/25" />

          <p className="mt-4 text-sm text-white/45">
            No specific features were selected.
          </p>

          <p className="mt-2 text-xs text-white/25">
            Nexora will focus on the core website experience first.
          </p>
        </div>
      )}
    </section>
  );
};

export default FeaturePlan;

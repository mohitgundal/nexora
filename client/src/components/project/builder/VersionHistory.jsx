import React from "react";
import { Clock3, RotateCcw, Sparkles } from "lucide-react";

const VersionHistory = ({ versions, onRestoreVersion }) => {
  if (!versions || versions.length === 0) {
    return (
      <section className="flex h-full flex-col">
        <div className="border-b border-white/10 px-4 py-4">
          <h2 className="text-sm font-medium">Version History</h2>
          <p className="mt-1 text-xs text-white/30">
            Your website changes will appear here.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <Clock3 className="mx-auto size-8 text-white/20" />
            <p className="mt-3 text-sm text-white/40">
              No versions available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-400/10">
            <Clock3 className="size-4 text-purple-300" />
          </div>

          <div>
            <h2 className="text-sm font-medium">Version History</h2>

            <p className="mt-0.5 text-xs text-white/30">
              Restore previous versions of your website
            </p>
          </div>
        </div>
      </div>

      {/* Versions */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {versions.map((version) => {
            const isCurrent = version.status === "current";
            // const canRestore = Boolean(version.code || version.websiteData);
            const canRestore = true;

            return (
              <article
                key={version.id}
                className={`rounded-xl border p-4 transition ${
                  isCurrent
                    ? "border-purple-400/30 bg-purple-400/[0.06]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
                          isCurrent
                            ? "bg-purple-400/10"
                            : "bg-white/[0.05]"
                        }`}
                      >
                        <Sparkles
                          className={`size-3.5 ${
                            isCurrent
                              ? "text-purple-300"
                              : "text-white/40"
                          }`}
                        />
                      </div>

                      <h3 className="truncate text-xs font-medium text-white">
                        {version.name}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-white/35">
                      {version.description}
                    </p>
                  </div>

                  {isCurrent && (
                    <span className="shrink-0 rounded-full border border-purple-400/20 bg-purple-400/10 px-2 py-1 text-[10px] font-medium text-purple-300">
                      Current
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-white/25">
                    {version.createdAt
                      ? new Date(version.createdAt).toLocaleString()
                      : "Recently"}
                  </span>

                  <button
                    type="button"
                    disabled={!canRestore || isCurrent}
                    onClick={() => onRestoreVersion(version.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <RotateCcw className="size-3" />
                    Restore
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VersionHistory;
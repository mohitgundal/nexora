import React, { useState, useRef, useEffect } from "react";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";

const VIEWPORTS = {
  desktop: {
    label: "Desktop",
    width: "100%",
    description: "Responsive width",
  },
  tablet: {
    label: "Tablet",
    width: "768px",
    description: "768 px",
  },
  mobile: {
    label: "Mobile",
    width: "375px",
    description: "375 px",
  },
};

const DEVICES = [
  { id: "desktop", icon: Monitor },
  { id: "tablet", icon: Tablet },
  { id: "mobile", icon: Smartphone },
];

const MIN_ZOOM = 50;
const MAX_ZOOM = 150;
const ZOOM_STEP = 10;

const LivePreview = () => {
  const [viewport, setViewport] = useState("desktop");
  const [zoom, setZoom] = useState(100);
  const [refreshKey, setRefreshKey] = useState(0);

  const canvasRef = useRef(null);

  const currentViewport = VIEWPORTS[viewport];
  const isDesktop = viewport === "desktop";

  const zoomIn = () => {
    setZoom((previous) => Math.min(previous + ZOOM_STEP, MAX_ZOOM));
  };

  const zoomOut = () => {
    setZoom((previous) => Math.max(previous - ZOOM_STEP, MIN_ZOOM));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  const fitToScreen = () => {
    if (!canvasRef.current) return;

    const availableWidth = canvasRef.current.clientWidth;

    const targetWidth = isDesktop
      ? availableWidth
      : parseInt(currentViewport.width, 10);

    if (!targetWidth) return;

    const widthScale = (availableWidth / targetWidth) * 100;

    setZoom(
      Math.max(MIN_ZOOM, Math.min(100, Math.floor(widthScale / 10) * 10)),
    );
  };

  useEffect(() => {
    setZoom(100);
  }, [viewport]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#08090d]">
      {/* Responsive Toolbar */}
      <div className="flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2 sm:px-4">
        {/* Preview Status */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>

          <span className="truncate text-xs font-medium text-gray-300">
            Live Preview
          </span>
        </div>

        {/* Device Controls */}
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
          {DEVICES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              title={`${VIEWPORTS[id].label} preview`}
              aria-label={`${VIEWPORTS[id].label} preview`}
              aria-pressed={viewport === id}
              onClick={() => setViewport(id)}
              className={`rounded-md p-1.5 transition ${
                viewport === id
                  ? "bg-violet-500/20 text-violet-300"
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Zoom out"
            aria-label="Zoom out"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ZoomOut size={14} />
          </button>

          <button
            type="button"
            title="Reset zoom"
            aria-label="Reset zoom"
            onClick={resetZoom}
            className="min-w-[42px] rounded-md px-1.5 py-1 text-center text-[11px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            {zoom}%
          </button>

          <button
            type="button"
            title="Zoom in"
            aria-label="Zoom in"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ZoomIn size={14} />
          </button>

          <div className="mx-1 h-4 w-px bg-white/10" />

          <button
            type="button"
            title="Fit to screen"
            aria-label="Fit to screen"
            onClick={fitToScreen}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Maximize size={14} />
          </button>

          <button
            type="button"
            title="Refresh preview"
            aria-label="Refresh preview"
            onClick={() => setRefreshKey((previous) => previous + 1)}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Preview Canvas */}
      <div
        ref={canvasRef}
        className="relative flex min-h-0 flex-1 flex-col overflow-auto overscroll-contain bg-[#111318] p-3 sm:p-4"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
        }}
      >
        <div className="mb-3 flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <span>{currentViewport.label}</span>
          <span className="text-gray-700">•</span>
          <span>{currentViewport.description}</span>
          <span className="text-gray-700">•</span>
          <span>{zoom}% zoom</span>
        </div>

        {/* Device Viewport */}
        <div
          className={`mx-auto flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-2xl transition-[width] duration-300 ${
            isDesktop ? "w-full" : "shrink-0"
          }`}
          style={{
            width: currentViewport.width,
            maxWidth: isDesktop ? "100%" : "none",
          }}
        >
          {/* Zoom Layer */}
          <div
            style={{
              width: `${10000 / zoom}%`,
              height: `${10000 / zoom}%`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
          >
            <SandpackPreview
              key={refreshKey}
              showNavigator
              showRefreshButton
              showOpenInCodeSandbox={false}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "300px",
                touchAction: "pan-x pan-y",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;

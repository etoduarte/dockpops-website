"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* Apple squircle clip-path */
const SQUIRCLE =
  "M 0.344,0 L 0.656,0 C 0.755,0 0.805,0 0.849,0.015 L 0.858,0.017 C 0.916,0.038 0.962,0.084 0.983,0.142 C 1,0.195 1,0.245 1,0.344 L 1,0.656 C 1,0.755 1,0.805 0.985,0.849 L 0.983,0.858 C 0.962,0.916 0.916,0.962 0.858,0.983 C 0.805,1 0.755,1 0.656,1 L 0.344,1 C 0.245,1 0.195,1 0.151,0.985 L 0.142,0.983 C 0.084,0.962 0.038,0.916 0.017,0.858 C 0,0.805 0,0.755 0,0.656 L 0,0.344 C 0,0.245 0,0.195 0.015,0.151 L 0.017,0.142 C 0.038,0.084 0.084,0.038 0.142,0.017 C 0.195,0 0.245,0 0.344,0 Z";

/* ─── Icon paths for real images ─── */
const IMAGE_ICONS: Record<string, string> = {
  xcode: "/icons/xcode.png",
  claude: "/icons/claude.png",
  gemini: "/icons/gemini.png",
  figma: "/icons/figma.png",
  "pixelmator-pro": "/icons/pixelmator-pro.png",
  "final-cut-pro": "/icons/final-cut-pro.png",
  motion: "/icons/motion.png",
  imovie: "/icons/imovie.png",
  "logic-pro": "/icons/logic-pro.png",
  word: "/icons/word.png",
  powerpoint: "/icons/powerpoint.png",
  teams: "/icons/teams.png",
  onedrive: "/icons/onedrive.png",
  steam: "/icons/steam.png",
  witcher: "/icons/witcher.png",
  crossover: "/icons/crossover.png",
  folder: "/icons/folder.png",
  document: "/icons/document.png",
  "photo-doc": "/icons/photo-doc.png",
};

/* ─── App Icon Component ─── */
function AppIcon({ id, size = 52 }: { id: string; size?: number }) {
  const s = size;

  if (IMAGE_ICONS[id]) {
    return (
      <Image
        src={IMAGE_ICONS[id]}
        alt=""
        width={256}
        height={256}
        sizes={`${s}px`}
        quality={90}
        style={{
          width: s,
          height: s,
          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
        }}
      />
    );
  }

  /* SVG fallbacks for file / folder types */
  const base: React.CSSProperties = {
    width: s,
    height: s,
    clipPath: "url(#sq-carousel)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
  };

  const svgIcons: Record<string, () => React.ReactNode> = {
    code_file: () => (
      <div style={{ ...base, background: "linear-gradient(180deg, #8E8E93, #636366)" }}>
        <svg width={s * 0.4} height={s * 0.48} viewBox="0 0 16 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <rect x="1" y="1" width="14" height="18" rx="2" fill="white" fillOpacity="0.15" />
          <path d="M5 8l-2.5 2.5L5 13" />
          <path d="M11 8l2.5 2.5L11 13" />
          <line x1="9" y1="7" x2="7" y2="14" />
        </svg>
      </div>
    ),
  };

  const render = svgIcons[id];
  return render ? <>{render()}</> : (
    <div style={{ ...base, background: "linear-gradient(180deg, #8E8E93, #636366)" }} />
  );
}

/* ─── Feature Pop Definitions ─── */
interface FeaturePop {
  feature: string;
  description: string;
  title: string;
  cols: number;
  apps: { id: string; name: string }[];
  variant: "files" | "open-all" | "sort" | "pop-out";
}

const FEATURES: FeaturePop[] = [
  {
    feature: "Files & Folders",
    description: "Not just apps — add documents, folders, and project files to any Pop.",
    title: "Dev Project",
    cols: 3,
    variant: "files",
    apps: [
      { id: "xcode", name: "Xcode" },
      { id: "claude", name: "Claude" },
      { id: "gemini", name: "Gemini" },
      { id: "folder", name: "Assets" },
      { id: "document", name: "Brief.pdf" },
      { id: "photo-doc", name: "Hero.jpg" },
    ],
  },
  {
    feature: "Open All",
    description: "Launch every app in a Pop with a single click.",
    title: "Office",
    cols: 2,
    variant: "open-all",
    apps: [
      { id: "word", name: "Word" },
      { id: "powerpoint", name: "PowerPoint" },
      { id: "teams", name: "Teams" },
      { id: "onedrive", name: "OneDrive" },
    ],
  },
  {
    feature: "Sort Items",
    description: "Alphabetical, by kind, or drag to reorder — your call.",
    title: "Creative",
    cols: 3,
    variant: "sort",
    apps: [
      { id: "figma", name: "Figma" },
      { id: "final-cut-pro", name: "Final Cut" },
      { id: "imovie", name: "iMovie" },
      { id: "logic-pro", name: "Logic Pro" },
      { id: "motion", name: "Motion" },
      { id: "pixelmator-pro", name: "Pixelmator" },
    ],
  },
  {
    feature: "Pop Out",
    description: "Detach any Pop into a floating window that stays on your desktop.",
    title: "Gaming",
    cols: 3,
    variant: "pop-out",
    apps: [
      { id: "steam", name: "Steam" },
      { id: "witcher", name: "The Witcher" },
      { id: "crossover", name: "CrossOver" },
    ],
  },
];

/* ─── Glass styles ─── */
const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  border: "0.5px solid rgba(255,255,255,0.35)",
};

/* ─── Feature Pop Card ─── */
function FeatureCard({ pop }: { pop: FeaturePop }) {
  const iconSize = 52;
  const isPopOut = pop.variant === "pop-out";

  return (
    <div className="flex flex-col items-center gap-5" style={{ width: 300 }}>
      {/* Feature label */}
      <span className="text-sm font-bold text-white tracking-wide uppercase">{pop.feature}</span>

      {/* Pop visual */}
      <div className="relative w-full">
        {isPopOut ? (
          /* ── Pop Out variant: macOS floating window ── */
          <div
            className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 mx-auto"
            style={{
              background: "rgba(246,246,246,0.92)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "0.5px solid rgba(0,0,0,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: 280,
            }}
          >
            {/* Window title bar */}
            <div
              className="h-7 flex items-center px-2.5 border-b border-black/5"
              style={{ background: "rgba(228,228,228,0.85)" }}
            >
              <div className="flex gap-[6px]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <span className="flex-1 text-center text-[11px] font-medium text-gray-500">{pop.title}</span>
              <div className="w-[42px]" />
            </div>
            {/* App grid — light theme */}
            <div className="px-4 py-4 grid gap-2 justify-items-center" style={{ gridTemplateColumns: `repeat(${pop.cols}, 1fr)` }}>
              {pop.apps.map((app, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-1">
                  <AppIcon id={app.id} size={iconSize} />
                  <span className="text-[10px] text-gray-500 text-center leading-tight truncate w-full">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Standard Pop variants ── */
          <div className="relative mx-auto" style={{ maxWidth: 280 }}>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40" style={GLASS}>
              {/* Header */}
              <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-white/90">{pop.title}</span>

                {pop.variant === "open-all" && (
                  <span className="text-[10px] font-semibold text-white/60 bg-white/10 rounded-md px-2 py-0.5">
                    Open All
                  </span>
                )}

                {pop.variant === "sort" && (
                  <span className="text-[10px] font-semibold text-white/60 bg-white/10 rounded-md px-2 py-0.5 flex items-center gap-1">
                    A→Z
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="white" fillOpacity="0.5">
                      <path d="M2 3.5h6L5 7z" />
                    </svg>
                  </span>
                )}
              </div>

              {/* App grid */}
              <div className="px-4 pb-2 grid gap-2 justify-items-center" style={{ gridTemplateColumns: `repeat(${pop.cols}, 1fr)` }}>
                {pop.apps.map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-1">
                    <AppIcon id={app.id} size={iconSize} />
                    <span className="text-[10px] text-white/70 text-center leading-tight truncate w-full">{app.name}</span>
                  </div>
                ))}
              </div>

              {/* Files indicator */}
              {pop.variant === "files" && (
                <div className="px-4 pb-2">
                  <div className="border-t border-white/10 pt-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="white" fillOpacity="0.4">
                      <path d="M1 2h4l1 1h5a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1V3a1 1 0 011-1z" />
                    </svg>
                    <span className="text-[9px] text-white/40">3 apps, 2 files, 1 folder</span>

                  </div>
                </div>
              )}

              {/* Page dots */}
              <div className="flex justify-center gap-1.5 pb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Glass arrow */}
            <div
              className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rotate-45"
              style={{ ...GLASS, zIndex: 0 }}
            />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-[14px] text-white/50 text-center leading-snug px-2">{pop.description}</p>
    </div>
  );
}

/* ─── Carousel — one card at a time ─── */
export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelLock = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  function goTo(index: number) {
    setActiveIndex(index);
    resetTimer();
  }

  function next() {
    setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    resetTimer();
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    resetTimer();
  }

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      // Only act on horizontal swipes that are stronger than vertical
      if (Math.abs(e.deltaX) < 10 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      e.stopPropagation();
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaX > 0) next();
      else prev();
      setTimeout(() => { wheelLock.current = false; }, 600);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Squircle clip-path for SVG icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="sq-carousel" clipPathUnits="objectBoundingBox">
            <path d={SQUIRCLE} />
          </clipPath>
        </defs>
      </svg>

      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/bg-blueberry-oxygen.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Here a Pop, there a Pop
        </h2>
        <p className="text-xl text-white/70 text-center mb-14 max-w-2xl mx-auto">
          Make multiple Pops and swipe between them. Or pop out your favorites
          to keep things at your fingertips.
        </p>

        {/* Single card display with nav */}
        <div
          ref={carouselRef}
          className="relative flex items-start justify-center touch-pan-y"
          style={{ minHeight: 420, overscrollBehaviorX: "none" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-[calc(50%-200px)] top-[180px] z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            aria-label="Previous feature"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2L4 8l6 6" />
            </svg>
          </button>

          {/* Cards — only active one is visible */}
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="transition-all duration-500 ease-out absolute"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform:
                  i === activeIndex
                    ? "translateX(0) scale(1)"
                    : i < activeIndex
                      ? "translateX(-60px) scale(0.95)"
                      : "translateX(60px) scale(0.95)",
                pointerEvents: i === activeIndex ? "auto" : "none",
              }}
            >
              <FeatureCard pop={f} />
            </div>
          ))}

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute left-[calc(50%+160px)] top-[180px] z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            aria-label="Next feature"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {FEATURES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white w-6"
                  : "bg-white/30 hover:bg-white/50 w-2"
              }`}
              aria-label={`Go to feature ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

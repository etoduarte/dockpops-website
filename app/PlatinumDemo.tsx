"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/* ─── Platinum Design Tokens ─── */
const CHROME = "#D4D0C8";
const FONT = '"Geneva", "Helvetica Neue", sans-serif';

const R: React.CSSProperties = {
  borderStyle: "solid", borderWidth: 1,
  borderTopColor: "#FFF", borderLeftColor: "#FFF",
  borderBottomColor: "#808080", borderRightColor: "#808080",
};
const S: React.CSSProperties = {
  borderStyle: "solid", borderWidth: 1,
  borderTopColor: "#808080", borderLeftColor: "#808080",
  borderBottomColor: "#FFF", borderRightColor: "#FFF",
};
const STRIPES = "repeating-linear-gradient(0deg,#C0C0C0 0px,#C0C0C0 1px,#E8E8E8 1px,#E8E8E8 2px)";

/*
  iMac G4 PNG is 1797×1875. Desktop area (below menu bar):
  x: 152→1640  y: 217→1015  →  1489×799 px at native resolution.
  We render the overlay at native size and CSS-scale to match.
*/
const IMG_W = 1797;
const IMG_H = 1875;
const DESK_X = 152;
const DESK_Y = 217;
const DESK_W = 1489;
const DESK_H = 799;

/* ─── Apps ─── */
const apps = [
  { id: "simpletext", name: "SimpleText", emoji: "📝", bg: "#A0C8F0" },
  { id: "simcinema",  name: "SimCinema",  emoji: "🎬", bg: "#F0A0A0" },
  { id: "stickies",   name: "Stickies",   emoji: "📌", bg: "#F0E080" },
  { id: "sherlock",   name: "Sherlock",    emoji: "🔍", bg: "#C0A0E0" },
];

/* Window positions & scale in native desktop pixels (1489×799) */
const WIN: Record<string, { left: number; top: number; width: number; scale: number }> = {
  simpletext: { left: 30,   top: 40,  width: 340, scale: 273 },
  simcinema:  { left: 1059, top: 43,  width: 240, scale: 179 },
  stickies:   { left: 27,   top: 511, width: 280, scale: 188 },
  sherlock:   { left: 960,  top: 420, width: 340, scale: 147 },
};

/* ─── Window Contents ─── */
function Content({ id }: { id: string }) {
  const f: React.CSSProperties = { fontFamily: FONT, fontSize: 11, color: "#000" };
  switch (id) {
    case "simpletext":
      return (
        <div style={{ ...f, lineHeight: 1.6 }}>
          <p>Welcome to DockPops!</p>
          <p style={{ marginTop: 4 }}>
            Organize your favorite apps into groups called Pops.
            Click a Pop in your Dock to see everything at once.
          </p>
          <p style={{ marginTop: 4 }}>It&apos;s that simple.</p>
        </div>
      );
    case "simcinema": {
      const hits = [
        { title: "Alien Ant Farm", gross: "$12.4M", rating: "⭐ 4.8" },
        { title: "Taco Tuesday 2", gross: "$9.1M", rating: "⭐ 4.2" },
        { title: "Cat Planet", gross: "$7.6M", rating: "⭐ 4.5" },
        { title: "The Big Cheese", gross: "$5.3M", rating: "⭐ 3.9" },
      ];
      return (
        <div style={{ background: "#1a1a2e", margin: -6, padding: 0, fontFamily: FONT, color: "#fff" }}>
          {/* Theater screen */}
          <div style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 100%)", padding: "6px 8px 4px", textAlign: "center" }}>
            <div style={{ background: "#000", borderRadius: 2, padding: "4px 0", fontSize: 8, color: "#F0C040", letterSpacing: 1 }}>
              NOW SHOWING
            </div>
          </div>
          {/* Stats bar */}
          <div style={{ background: "#2a1a1a", padding: "3px 8px", display: "flex", justifyContent: "space-between", fontSize: 8, borderTop: "1px solid #444" }}>
            <span>🎭 Screen 1</span>
            <span>🪑 84/120</span>
          </div>
          {/* Box office hits */}
          <div style={{ background: "#12122a", borderTop: "1px solid #333" }}>
            <div style={{ padding: "4px 8px 2px", fontSize: 7, color: "#F0C040", letterSpacing: 0.5, textTransform: "uppercase" }}>
              Box Office Hits
            </div>
            {hits.map((h, i) => (
              <div key={i} style={{
                padding: "3px 8px", fontSize: 8, display: "flex", justifyContent: "space-between",
                borderTop: "1px solid #1a1a3e",
                background: i === 0 ? "rgba(240,192,64,0.1)" : "transparent",
              }}>
                <span style={{ color: i === 0 ? "#F0C040" : "#ccc" }}>{i + 1}. {h.title}</span>
                <span style={{ color: "#888" }}>{h.gross} {h.rating}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "stickies":
      return (
        <div style={{ background: "#FFFF88", margin: -6, padding: 8, fontFamily: FONT, fontSize: 11, color: "#333", minHeight: 50 }}>
          Don&apos;t forget to try DockPops!
          <br /><br />
          ⭐ Free to use
          <br />
          🚀 Premium: $4.99
        </div>
      );
    case "sherlock": {
      const channels = ["📁","🌐","👤","📰","","🛒"];
      return (
        <div style={{ fontFamily: FONT, margin: -6, padding: 0 }}>
          {/* Channel toolbar */}
          <div style={{ display: "flex", justifyContent: "center", gap: 7, padding: "6px 8px", background: CHROME, borderBottom: "1px solid #808080" }}>
            {channels.map((ch, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: 2, fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...(i === 1 ? S : {}),
                background: i === 1 ? "#FFF" : "transparent",
                cursor: "default",
              }}>{ch}</div>
            ))}
          </div>
          {/* Search bar */}
          <div style={{ display: "flex", gap: 4, padding: "6px 8px", alignItems: "center", background: CHROME }}>
            <div style={{ flex: 1, ...S, background: "#FFF", padding: "4px 7px", fontSize: 15, color: "#000" }}>
              DockPops
            </div>
            <button style={{ ...R, background: CHROME, padding: "4px 10px", cursor: "default", fontSize: 14 }}>Find</button>
          </div>
          {/* Quote */}
          <div style={{ background: "#FFF", padding: "12px 12px", fontSize: 15, color: "#333", lineHeight: 1.6, borderTop: "1px solid #808080" }}>
            I&apos;ve always wanted app groups in the dock. It&apos;s been in iOS for years! ✨
          </div>
        </div>
      );
    }
    default: return null;
  }
}

/* ─── Platinum Window ─── */
function PlatWindow({
  appId, name, isActive, zIndex, onClose, onFocus, pos,
}: {
  appId: string; name: string; isActive: boolean; zIndex: number;
  onClose: () => void; onFocus: () => void;
  pos: { left: number; top: number; width: number; scale: number };
}) {
  const s = pos.scale / 100;
  return (
    <div
      onMouseDown={onFocus}
      style={{ position: "absolute", left: pos.left, top: pos.top, width: pos.width, zIndex, transform: `scale(${s})`, transformOrigin: "top left" }}
    >
      <div style={{
        background: CHROME, ...R, borderWidth: 2, borderRadius: 3,
        boxShadow: isActive ? "1px 1px 6px rgba(0,0,0,0.35)" : "1px 1px 3px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}>
        {/* Title bar */}
        <div style={{
          height: 20,
          background: isActive ? STRIPES : CHROME,
          display: "flex", alignItems: "center", padding: "0 4px",
          borderBottom: "1px solid #808080",
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{ width: 12, height: 12, ...R, background: CHROME, cursor: "pointer", flexShrink: 0 }}
          />
          <span style={{
            flex: 1, textAlign: "center", fontSize: 11, fontWeight: "bold",
            fontFamily: FONT, color: isActive ? "#000" : "#888",
          }}>
            {name}
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            <div style={{ width: 12, height: 12, ...R, background: CHROME }} />
            <div style={{ width: 12, height: 12, ...R, background: CHROME }} />
          </div>
        </div>
        {/* Content */}
        <div style={{ background: "#FFF", ...S, margin: 2, padding: 6 }}>
          <Content id={appId} />
        </div>
        {/* Resize grip */}
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 12, height: 12,
          background: "linear-gradient(135deg,transparent 50%,#808080 50%,#808080 55%,transparent 55%,transparent 60%,#808080 60%,#808080 65%,transparent 65%)",
        }} />
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function PlatinumDemo() {
  const [popOpen, setPopOpen] = useState(true);
  const [wins, setWins] = useState<{ id: string; z: number }[]>([]);
  const [nextZ, setNextZ] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const renderedW = entries[0].contentRect.width;
      setScale(renderedW / IMG_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function open(appId: string) {
    if (wins.some(w => w.id === appId)) { front(appId); return; }
    setWins(p => [...p, { id: appId, z: nextZ }]);
    setNextZ(z => z + 1);
  }
  function close(appId: string) { setWins(p => p.filter(w => w.id !== appId)); }
  function front(appId: string) {
    setWins(p => p.map(w => w.id === appId ? { ...w, z: nextZ } : w));
    setNextZ(z => z + 1);
  }

  const topId = wins.length ? wins.reduce((a, b) => a.z > b.z ? a : b).id : null;

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Section background — UFO wallpaper */}
      <div className="absolute inset-0">
        <Image src="/platinum-desktop.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-10" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>Try a Pop</h2>

        {/* iMac container */}
        <div ref={containerRef} className="mx-auto relative" style={{ maxWidth: 640, overflow: "hidden" }}>
          {/* iMac image — contains bezel, menu bar, and desktop background */}
          <Image
            src="/imac-g4.png"
            alt="iMac G4 running Mac OS 9"
            width={IMG_W}
            height={IMG_H}
            className="w-full h-auto relative"
            style={{ zIndex: 1 }}
            priority
          />

          {/* Interactive overlay — rendered at native size then CSS-scaled to match */}
          <div style={{
            position: "absolute",
            left: DESK_X * scale,
            top: DESK_Y * scale,
            width: DESK_W,
            height: DESK_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            zIndex: 2,
            overflow: "hidden",
          }}>
            {/* Windows */}
            {wins.map(w => {
              const app = apps.find(a => a.id === w.id)!;
              return (
                <PlatWindow
                  key={w.id} appId={w.id} name={app.name}
                  isActive={w.id === topId} zIndex={w.z}
                  pos={WIN[w.id]}
                  onClose={() => close(w.id)} onFocus={() => front(w.id)}
                />
              );
            })}

            {/* Dock at bottom of desktop */}
            <div style={{
              position: "absolute", bottom: 26, left: 0, right: 0,
              display: "flex", justifyContent: "center",
              zIndex: 100,
              transform: "scale(2.17)",
            }}>
              <div style={{
                background: CHROME, ...R, borderWidth: 2, borderRadius: 4,
                padding: "4px 10px", display: "flex", gap: 8, alignItems: "center",
              }}>
                <span style={{ fontSize: 24 }} title="Finder">📁</span>

                {/* DockPops icon + Pop */}
                <div style={{ position: "relative" }}>
                  {/* Pop panel */}
                  <div style={{
                    position: "absolute", bottom: "100%", left: "50%",
                    transform: popOpen
                      ? "translateX(calc(-50% + -2px)) translateY(-7px) scale(0.82)"
                      : "translateX(calc(-50% + -2px)) translateY(5px) scale(0.738)",
                    opacity: popOpen ? 1 : 0,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    pointerEvents: popOpen ? "auto" : "none",
                  }}>
                    <div style={{
                      background: CHROME, ...R, borderWidth: 2, borderRadius: 5,
                      padding: 5, boxShadow: "2px 3px 8px rgba(0,0,0,0.3)",
                    }}>
                      <div style={{
                        background: STRIPES, textAlign: "center", fontSize: 9,
                        fontFamily: FONT, fontWeight: "bold", padding: "2px 16px",
                        borderBottom: "1px solid #808080", marginBottom: 4,
                      }}>
                        My Apps
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                        {apps.map(app => (
                          <button
                            key={app.id}
                            onClick={() => open(app.id)}
                            style={{
                              width: 42, height: 42, ...R, background: app.bg,
                              borderRadius: 3, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 22,
                            }}
                            title={app.name}
                          >
                            {app.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setPopOpen(p => !p)}
                    style={{
                      fontSize: 24, cursor: "pointer", lineHeight: 1,
                      background: popOpen ? "#B0B0B0" : "transparent",
                      ...R, borderRadius: 3, padding: "1px 3px",
                    }}
                    title="DockPops"
                  >
                    🟧
                  </button>
                </div>

                <span style={{ fontSize: 24 }} title="Trash">🗑️</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl font-bold text-white/80 max-w-2xl mx-auto mt-8 leading-relaxed">
          Click the icons. Open some apps. That&apos;s a Pop.
        </p>
      </div>
    </section>
  );
}

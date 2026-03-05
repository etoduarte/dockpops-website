"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* Apple squircle clip-path (PaintCode Bezier curves, objectBoundingBox) */
const SQUIRCLE_PATH =
  "M 0.344,0 L 0.656,0 C 0.755,0 0.805,0 0.849,0.015 L 0.858,0.017 C 0.916,0.038 0.962,0.084 0.983,0.142 C 1,0.195 1,0.245 1,0.344 L 1,0.656 C 1,0.755 1,0.805 0.985,0.849 L 0.983,0.858 C 0.962,0.916 0.916,0.962 0.858,0.983 C 0.805,1 0.755,1 0.656,1 L 0.344,1 C 0.245,1 0.195,1 0.151,0.985 L 0.142,0.983 C 0.084,0.962 0.038,0.916 0.017,0.858 C 0,0.805 0,0.755 0,0.656 L 0,0.344 C 0,0.245 0,0.195 0.015,0.151 L 0.017,0.142 C 0.038,0.084 0.084,0.038 0.142,0.017 C 0.195,0 0.245,0 0.344,0 Z";

const quadrants = [
  { bg: "/bg-blueberry.jpg", top: 16, left: 16, s: 27,
    gradient: "linear-gradient(to bottom, #6ECAC2, #3D9B93)" },           // TL teal
  { bg: "/bg-tangerine.jpg", top: 16, left: 57, s: 27,
    gradient: "linear-gradient(to bottom, #E8A050, #C87530)" },           // TR orange
  { bg: "/bg-grape.jpg", top: 52, left: 16, s: 27,
    gradient: "linear-gradient(to bottom, #A87AB8, #7B4E92)" },           // BL purple
  { bg: "/bg-shutters.jpg", top: 52, left: 57, s: 27,
    gradient: "linear-gradient(135deg, #B8D8C8, #E8A8B8)" },             // BR pink/mint
];

export default function HeroPop() {
  const [logoPressed, setLogoPressed] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeBg, setActiveBg] = useState<string | null>(null);
  const [prevBg, setPrevBg] = useState<string | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  function changeBg(bg: string) {
    setPrevBg(activeBg);
    setActiveBg(bg);
  }

  useEffect(() => {
    const t1 = setTimeout(() => setLogoPressed(true), 600);
    const t2 = setTimeout(() => {
      setLogoPressed(false);
      setPopOpen(true);
      setHasAnimated(true);
    }, 900);
    const t3 = setTimeout(() => {
      setPressedIndex(0);
      setTimeout(() => setPressedIndex(null), 200);
      changeBg(quadrants[0].bg);
    }, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (!popOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        popRef.current && !popRef.current.contains(e.target as Node) &&
        logoRef.current && !logoRef.current.contains(e.target as Node)
      ) {
        setPopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popOpen]);

  function handleLogoClick() {
    if (!hasAnimated) return;
    setLogoPressed(true);
    setTimeout(() => {
      setLogoPressed(false);
      setPopOpen((prev) => !prev);
    }, 150);
  }

  return (
    <>
      {/* Hidden SVG defs for squircle clip-path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <path d={SQUIRCLE_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Hero background */}
      <div className="absolute inset-0 bg-black">
        {prevBg && (
          <Image src={prevBg} alt="" fill className="object-cover" />
        )}
        {activeBg && (
          <Image key={activeBg} src={activeBg} alt="" fill className="object-cover animate-fadeIn" />
        )}
      </div>

      {/* Content anchored to bottom */}
      <div className="relative h-full flex items-end justify-center pb-12">
        <div className="relative flex flex-col items-center">
          {/* Pop */}
          <div
            ref={popRef}
            className={`
              relative mb-6 transition-all duration-700
              ${popOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-75 pointer-events-none"
              }
            `}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <Image
              src="/hero/pop.png"
              alt="A Pop with four app shortcuts"
              width={260}
              height={260}
            />
            {quadrants.map((q, i) => {
              const isPressed = pressedIndex === i;
              return (
                /* Wrapper for drop-shadow */
                <div
                  key={i}
                  className="absolute aspect-square"
                  style={{
                    top: `${q.top}%`,
                    left: `${q.left}%`,
                    width: `${q.s}%`,
                    filter: isPressed
                      ? "drop-shadow(0 1px 1px rgba(0,0,0,0.08))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.18)) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    transition: "filter 0.15s ease",
                  }}
                >
                  {/* Outer squircle = border */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      clipPath: "url(#squircle)",
                      background: isPressed
                        ? "rgba(255,255,255,0.2)"
                        : "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* Inner squircle = fill (inset to reveal border) */}
                    <button
                      onClick={() => {
                        setPressedIndex(i);
                        setTimeout(() => setPressedIndex(null), 200);
                        changeBg(q.bg);
                      }}
                      className="absolute cursor-pointer"
                      style={{
                        inset: "4%",
                        clipPath: "url(#squircle)",
                        background: q.gradient,
                      }}
                      aria-label={`Change background ${i}`}
                    >
                      {/* Glass top shine */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isPressed
                            ? "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 25%)"
                            : "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 40%, transparent 55%)",
                          transition: "background 0.15s ease",
                        }}
                      />
                      {/* Pressed darkening */}
                      {isPressed && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 50%, transparent 75%)",
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Logo on shelf — clickable */}
          <div
            ref={logoRef}
            onClick={handleLogoClick}
            className={`
              transition-transform duration-200 cursor-pointer
              ${logoPressed ? "scale-[0.92]" : ""}
            `}
            style={{
              transitionTimingFunction: logoPressed
                ? "ease-in"
                : "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Image src="/hero/logo.png" alt="DockPops" width={640} height={160} priority />
          </div>

          {/* Subtitle */}
          <div className="mt-2">
            <Image src="/hero/subtitle.png" alt="The missing launcher for the Dock" width={580} height={64} priority />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function DownloadBadge({
  location,
  className = "h-12 w-auto",
  width = 200,
  height = 60,
}: {
  location: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <a
      href="#"
      className="hover:opacity-80 transition-opacity"
      onClick={() => {
        window.gtag?.("event", "download_click", { location });
      }}
    >
      <Image
        src="/mac-app-store-badge.svg"
        alt="Download on the Mac App Store"
        width={width}
        height={height}
        className={className}
      />
    </a>
  );
}

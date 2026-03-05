import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DockPops — The Missing App Launcher for Your Dock",
  description:
    "Swipeable app groups in your Dock. Organize apps, files, and folders into named Pops. SmartyPops suggests groups for you. Native Mac app, no tracking, fully sandboxed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-black"
        style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

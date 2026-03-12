import type { Metadata } from "next";
import Script from "next/script";
import QAOverlay from "./QAOverlay";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DTCD5Q6KTJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTCD5Q6KTJ');
          `}
        </Script>
      </head>
      <body
        className="antialiased bg-black"
        style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        {children}
        <QAOverlay />
      </body>
    </html>
  );
}

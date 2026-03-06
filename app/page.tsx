import type { Metadata } from "next";
import Image from "next/image";
import HeroPop from "./HeroPop";
import PlatinumDemo from "./PlatinumDemo";

export const metadata: Metadata = {
  openGraph: {
    title: "DockPops — The Missing App Launcher for Your Dock",
    description: "Organize apps, files, and folders into groups in your Dock. Native Mac app, no tracking.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DockPops — The Missing App Launcher for Your Dock",
    description: "Organize apps, files, and folders into groups in your Dock. Native Mac app, no tracking.",
    images: ["/preview.png"],
  },
};

export default function DockPopsPage() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">

      {/* Menu bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-5">
            <a href="#features" className="text-white/50 hover:text-white/80 transition-colors">Features</a>
            <a href="#privacy" className="text-white/50 hover:text-white/80 transition-colors">Privacy</a>
            <a href="#support" className="text-white/50 hover:text-white/80 transition-colors">Support</a>
          </div>
          <a
            href="#"
            className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Download
          </a>
        </div>
      </nav>

      {/* Hero — full viewport */}
      <section className="relative h-screen overflow-hidden">
        <HeroPop />
      </section>

      {/* 1. Click Pops to open anything */}
      <section id="features" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Click Pops to open anything</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
            <iframe
              src="https://www.youtube.com/embed/w20oPNo7X08?autoplay=1&mute=1&loop=1&playlist=w20oPNo7X08&rel=0&vq=hd1080"
              title="How do you Pop?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xl font-bold text-white/80 max-w-2xl mx-auto mt-8 leading-relaxed">
            The Dock launches stuff. It just doesn&apos;t organize it very well.
            DockPops adds groups to your Dock so your favorite apps, folders, and files
            are just a click away.
          </p>
        </div>
      </section>

      {/* Interactive Platinum Demo */}
      <PlatinumDemo />

      {/* 2. Make Pops out of anything */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-blueberry.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Make Pops out of anything</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
            <iframe
              src="https://www.youtube.com/embed/Cf8aiYG-ZOo?autoplay=1&mute=1&loop=1&playlist=Cf8aiYG-ZOo&rel=0&vq=hd1080"
              title="Make Pops out of anything"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xl font-bold text-white/80 max-w-2xl mx-auto mt-8 leading-relaxed">
            Add Apps, Files and Folders to your Pops.
            Your Weekly Report pop opens everything you need in one click.
          </p>
        </div>
      </section>

      {/* 3. SmartyPops can get you started */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-grape.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">SmartyPops can get you started</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
            <iframe
              src="https://www.youtube.com/embed/juNhzw-GLEs?autoplay=1&mute=1&loop=1&playlist=juNhzw-GLEs&rel=0&vq=hd1080"
              title="SmartyPops can get you started"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xl font-bold text-white/80 max-w-2xl mx-auto mt-8 leading-relaxed">
            If you&apos;re feeling stuck, SmartyPops can suggest some pops to get you
            started. You can always change, rename or delete them later!
          </p>
        </div>
      </section>

      {/* 4. Bento — Premium features */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-10"
            style={{ fontFamily: "ui-rounded, 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", fontStretch: "condensed" }}
          >
            Big Upgrade. Low Price.
          </h2>
          <Image
            src="/bento.jpg"
            alt="DockPops Premium — Up to 10 Pops, 16 items per Pop, Open All, Alternate App Icons, Bigger SmartyPops. $4.99 one-time purchase."
            width={1920}
            height={1080}
            className="rounded-2xl shadow-2xl shadow-black/50 border border-white/10"
          />
          <p className="text-xl font-bold text-white/80 max-w-2xl mx-auto mt-8 leading-relaxed">
            DockPops is free to use for 2 pops of 6 items each. Upgrade once and keep forever.
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4">Private by design.</h2>
          <p className="text-xl text-white/50 text-center mb-12">Your data stays on your Mac. Period.</p>

          <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-8 md:p-12">
            <h3 className="text-2xl font-semibold mb-6">Privacy Policy</h3>
            <p className="text-sm text-white/40 mb-6">Last updated: March 2026</p>
            <div className="space-y-6 text-white/70">
              <div>
                <h4 className="font-medium text-white mb-2">No Data Collection</h4>
                <p>DockPops does not collect, store, or transmit any personal data. Zero analytics. Zero tracking.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">No Network Access</h4>
                <p>The app makes no network calls. Everything runs locally. Your app list, your groups, your preferences — all stored in UserDefaults on your Mac.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Fully Sandboxed</h4>
                <p>DockPops runs in a macOS sandbox with minimal permissions. It can read files you select and access UserDefaults. That&apos;s it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Need help?</h2>
          <p className="text-xl text-white/50 mb-8">We&apos;re here for you.</p>
          <a
            href="mailto:dockpops@applacat.com"
            className="inline-flex items-center justify-center gap-2 bg-zinc-800 text-white font-medium px-8 py-4 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            dockpops@applacat.com
          </a>
          <p className="text-white/40 text-sm mt-6">We typically respond within 48 hours.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/50">&copy; {new Date().getFullYear()} Applacat LLC. All rights reserved.</span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

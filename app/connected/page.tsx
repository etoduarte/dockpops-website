import type { Metadata } from "next";
import Image from "next/image";
import HeroDemo from "../HeroDemo";
import FeatureCarousel from "../FeatureCarousel";
import ABHeadline from "../ABHeadline";
import DownloadBadge from "../DownloadBadge";

export const metadata: Metadata = {
  openGraph: {
    title: "DockPops — The Missing Launcher for Your Dock",
    description: "iPhone-like app folders for your Dock. Organize apps, files, and folders into Pops. Native Mac app, no tracking.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DockPops — The Missing Launcher for Your Dock",
    description: "iPhone-like app folders for your Dock. Organize apps, files, and folders into Pops. Native Mac app, no tracking.",
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
            <a href="#" className="text-white font-bold text-sm tracking-tight mr-2">DockPops</a>
            <a href="#features" className="text-white/50 hover:text-white/80 transition-colors">Features</a>
            <a href="#pricing" className="text-white/50 hover:text-white/80 transition-colors">Pricing</a>
            <a href="#support" className="text-white/50 hover:text-white/80 transition-colors">Support</a>
          </div>
          <DownloadBadge location="nav" className="h-7 w-auto" height={36} width={120} />
        </div>
      </nav>

      {/* Hero — full viewport */}
      <section className="relative h-screen overflow-hidden">
        <HeroDemo easterEgg />
      </section>

      {/* Use Pops to open Anything */}
      <section id="features" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <ABHeadline className="text-4xl md:text-5xl font-bold mb-6" />
          <p className="text-xl font-bold text-white leading-relaxed mb-10 max-w-md mx-auto">
            DockPops put iPhone folders in your Dock. Your apps, files, and folders — a click away.
          </p>
          <Image
            src="/family-photo-imac.png"
            alt="DockPops in action — Settings window, Pop organizer, an open Pop in the Dock, a popped-out Music window, and a Games Pop"
            width={1825}
            height={1324}
            sizes="(max-width: 768px) 100vw, 768px"
            quality={90}
            className="drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Feature Carousel — Here a Pop, there a Pop */}
      <FeatureCarousel />

      {/* Pricing */}
      <section id="pricing" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{ fontFamily: "ui-rounded, 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", fontStretch: "condensed" }}
          >
            Download Free. Upgrade Once.
          </h2>

          {/* Launch sale banner */}
          <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-black text-lg font-black px-8 py-2.5 rounded-full shadow-lg mb-10 tracking-wide">
            🎉 30% OFF LAUNCH SALE
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {/* Free tier */}
            <div className="bg-zinc-900/80 backdrop-blur rounded-2xl border border-white/10 p-8 text-left">
              <p className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">Free</p>
              <p className="text-3xl font-bold mb-1">DockPops</p>
              <p className="text-white/50 mb-6">Free forever</p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  2 Pops
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  6 apps per Pop
                </li>
              </ul>
            </div>

            {/* Premium tier */}
            <div className="bg-zinc-900/80 backdrop-blur rounded-2xl border border-orange-500/30 p-8 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                LIFETIME
              </div>
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Premium</p>
              <p className="text-3xl font-bold mb-1">
                <span className="text-white/30 line-through text-xl mr-2">$9.99</span>
                $6.99
                <span className="text-lg font-normal text-white/40 ml-2">one time</span>
              </p>
              <p className="text-white/50 mb-6">No subscription. Ever.</p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Up to 10 Pops
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  16 items per Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Add files &amp; folders
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Pop out into floating windows
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Open All &amp; Sort
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Alternate app icons
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Filters on Add App screen
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  SmartyPop suggestions
                </li>
              </ul>
            </div>
          </div>

          {/* Full feature catalog */}
          <h3 className="text-2xl font-bold mb-10">All the features</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {[
              {
                emoji: "🖱️",
                category: "Dock Icon & Access",
                features: [
                  { text: "Click the DockPops icon to open a popover of apps and files", free: true },
                  { text: "Pops work with Dock on bottom, left, or right side of screen", free: true },
                  { text: "5 premium app icon variants (Blue, Teal, Violet, Graphite, Amber)", free: false },
                ],
              },
              {
                emoji: "🚀",
                category: "Launch Apps, Files & Folders",
                features: [
                  { text: "Click an app icon to launch it", free: true },
                  { text: "Click a file icon to open the file", free: true },
                  { text: "Click a folder icon to open it in Finder", free: true },
                  { text: "Files and folders show rich QuickLook thumbnail previews", free: true },
                  { text: "\"Open All\" launches every item in a Pop simultaneously", free: false },
                  { text: "Confirmation dialog before Opening All (global toggle)", free: false },
                ],
              },
              {
                emoji: "👆",
                category: "Multi-Pop Carousel",
                features: [
                  { text: "Swipe between Pops", free: true },
                  { text: "Change animation speed (Slow / Medium / Fast)", free: true },
                ],
              },
              {
                emoji: "🤏",
                category: "Drag & <s>Drop</s> Pop",
                features: [
                  { text: "Drag apps, files, or folders from Finder into the Pop setup window", free: true },
                  { text: "Pop picker when multiple Pops exist", free: false },
                  { text: "Drag onto the DockPops Dock icon to add to a Pop", free: false },
                  { text: "Drag multiple items from Finder at once", free: false },
                ],
              },
              {
                emoji: "🔍",
                category: "App Browser",
                features: [
                  { text: "+ button and Browse button open the App Browser", free: true },
                  { text: "Live search bar", free: true },
                  { text: "Category filters", free: true },
                  { text: "Click an app to add or remove from current Pop", free: true },
                  { text: "\"Not in Any Pop\" filter", free: false },
                  { text: "\"Recently Installed\" filter", free: false },
                ],
              },
              {
                emoji: "🗂️",
                category: "Organizing Pops",
                features: [
                  { text: "Reorder items by dragging within the editor grid", free: true },
                  { text: "Remove icons from browser or Pop preview", free: true },
                  { text: "Rename Pops by swiping right on the name or clicking it on the Pop preview", free: true },
                  { text: "Reorder Pops by dragging in the sidebar", free: true },
                  { text: "Swipe and right-click for rename and delete", free: true },
                  { text: "Create a new Pop from the button or ⌘N", free: true },
                  { text: "Item count and limit", free: true },
                ],
              },
              {
                emoji: "⭐",
                category: "Premium Features",
                subsections: [
                  {
                    title: "🧠 SmartyPops",
                    features: [
                      "Swipe, dismiss, and regenerate SmartiePop previews",
                      "Save SmartyPop suggestions to your Pops",
                    ],
                  },
                  {
                    title: "📌 Pop Out Windows",
                    features: [
                      "Pop Out any Pop as a floating, always-on-top window",
                      "Launch items directly from Pop Out windows",
                    ],
                  },
                  {
                    title: "🎛️ Poptions",
                    features: [
                      "Sort per Pop: Alphabetical, Most Used, Recently Added",
                    ],
                  },
                ],
              },
              {
                emoji: "✨",
                category: "And More",
                features: [
                  { text: "Easy onboarding with starter Pop templates", free: true },
                  { text: "Right-click actions on Dock icon", free: true },
                  { text: "Reduce Motion respected — no spring animations", free: true },
                  { text: "Light and dark mode support", free: true },
                  { text: "Access Settings via ⌘, or gear button", free: true },
                  { text: "\"Launch at login\" toggle", free: true },
                ],
              },
            ].map((group: Record<string, unknown>, gi: number) => (
              <div key={gi} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h4 className="font-semibold text-white mb-3 text-sm tracking-wider" dangerouslySetInnerHTML={{ __html: `${group.emoji} ${group.category}` }} />
                {Array.isArray(group.subsections) ? (
                  <div className="space-y-4">
                    {(group.subsections as Array<{ title: string; features: string[] }>).map((sub, si) => (
                      <div key={si}>
                        <p className="text-xs font-semibold text-white/50 mb-1.5">{sub.title}</p>
                        <ul className="space-y-1.5">
                          {sub.features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                                Pro
                              </span>
                              <span className="text-white/60">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    {(group.features as Array<{ text: string; free: boolean }>)?.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                        {f.free ? (
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                        ) : (
                          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                            Pro
                          </span>
                        )}
                        <span className="text-white/60">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Privacy — full width, darker */}
          <div id="privacy" className="mt-6 bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 text-left">
            <h4 className="font-semibold text-white mb-5 text-base tracking-wider">🔒 Private by Design</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h5 className="font-medium text-white text-sm mb-1">No Data Collection</h5>
                <p className="text-[13px] text-white/50 leading-snug">DockPops does not collect, store, or transmit any personal data. Zero analytics. Zero tracking.</p>
              </div>
              <div>
                <h5 className="font-medium text-white text-sm mb-1">No Network Access</h5>
                <p className="text-[13px] text-white/50 leading-snug">The app makes no network calls. Everything runs locally. Your app list, your groups, your preferences — all stored on your Mac.</p>
              </div>
              <div>
                <h5 className="font-medium text-white text-sm mb-1">Fully Sandboxed</h5>
                <p className="text-[13px] text-white/50 leading-snug">DockPops runs in a macOS sandbox with minimal permissions. It can read files you select and access UserDefaults. That&apos;s it.</p>
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

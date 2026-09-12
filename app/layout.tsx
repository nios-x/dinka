import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { PostProvider } from "@/app/Providers/PostsProvider";
import SessionProvider from "@/app/Providers/SessionProvider";
import { SocketProvider } from "@/app/hooks/videosocket";
import { ThemeProvider } from "@/app/Providers/ThemeProvider";
import { CountsProvider } from "@/app/Providers/CountsProvider";
import AppShell from "@/components/shell/AppShell";
import { Toaster } from "@/components/ui/sonner";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Dinka — To Be Social",
    template: "%s · Dinka",
  },
  description:
    "Dinka is a social network built around the people you actually follow: posts, stories, reels, messages, and your own numbers on your own profile.",
  manifest: "/manifest.json",
  applicationName: "Dinka",
  appleWebApp: { capable: true, title: "Dinka", statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192x192.png", sizes: "192x192" }],
  },
  other: {
    "google-site-verification": "W49636xYHCMc-ZbfBL18OBoCuP6j0kAKQ3VLFzd_E8A",
    "google-adsense-account": "ca-pub-6922023305389397",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eae4da" },
    { media: "(prefers-color-scheme: dark)", color: "#14110e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body className="antialiased">
        {/*
          Design direction — taken from the reference screens the user supplied.

          SURFACE: soft warm off-white page (#F4F1EC) with pure white cards,
          near-black warm ink (#17130F), generous 22px corners and soft low
          shadows. Primary actions are solid near-black pills, exactly as the
          references render "Start" and the active segment control. Teal
          (#12B39F) carries live and data accents; rose marks likes; amber
          marks trending. Dark theme inverts to a near-black page with charcoal
          cards, white pills and a brighter teal.

          TYPE: Bricolage Grotesque for headings and figures, Geist for UI text,
          Geist Mono for counts and timestamps. The lowercase "dinka" wordmark
          keeps its original self-hosted face.

          LAYOUT: phone first — frosted top bar, story rail of gradient rings,
          full-width post cards, and a floating pill dock with a raised compose
          button at its center. Desktop is a real three-column app: labeled left
          rail, 39rem feed, right sidebar of trending and suggestions.
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <PostProvider>
              <SocketProvider>
                <CountsProvider>
                  <AppShell>{children}</AppShell>
                  <Toaster />
                </CountsProvider>
              </SocketProvider>
            </PostProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import React from "react";
import { PostProvider } from "@/app/Providers/PostsProvider";
import SessionProvider from "@/app/Providers/SessionProvider";
import { SocketProvider } from "@/app/hooks/videosocket";
import { ThemeProvider } from "@/app/Providers/ThemeProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dinka - To Be Social",
  description: "Dinka is a social media app",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  icons: {
    icon: [
      { url: "/favicon-192x192.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "16x16", type: "image/png" },
    ],
  },
  other: {
    "google-site-verification": "W49636xYHCMc-ZbfBL18OBoCuP6j0kAKQ3VLFzd_E8A",
    "google-adsense-account": "ca-pub-6922023305389397",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="W49636xYHCMc-ZbfBL18OBoCuP6j0kAKQ3VLFzd_E8A"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-6922023305389397"
        />
      </head>
      <body className="bg-zinc-50 dark:bg-[#121212] antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <PostProvider>
              <SocketProvider>
                {/* ✅ Sticky Navbar Wrapper */}
                <div className="sticky top-0 z-50 bg-zinc-50 dark:bg-[#121212] shadow-sm">
                  <NavBar />
                </div>

                {/* ✅ Page Content */}
                <main className="pt-16">
                  {children}
                </main>
              </SocketProvider>
            </PostProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

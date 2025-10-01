import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
export const metadata: Metadata = {
  title: "Dinka - To Be Social",
  description: "Dinka is a social media app",
};
import React from "react";
import { PostProvider } from "@/app/Providers/PostsProvider";
import { SocketProvider } from "@/app/hooks/videosocket";
import AuthProvider from "@/app/Providers/SessionProvider";
import { auth } from "@/auth";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`bg-zinc-50 antialiased min-h-screen`}>
        <AuthProvider session={session}>
          <div className="w-screen min-h-screen relative">
            <NavBar />

            <div className="py-16"></div>
            <PostProvider>
              <SocketProvider>{children}</SocketProvider>
            </PostProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

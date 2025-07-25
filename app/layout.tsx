import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
export const metadata: Metadata = {
  title: "Dinka - To Be Social",
  description: "Dinka is a social media app",
};
import React from 'react';


import  SessionProvider from "@/app/Providers/SessionProvider";
export default function RootLayout({
  children,
}: any) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-50 antialiased min-h-screen`}
      >
            <SessionProvider>
              
    
              <div className="w-screen min-h-screen relative">

              <NavBar/>
              <div className="py-14"></div>
              {children}
              </div>
    
            </SessionProvider>
      </body>
    </html>
  );
}

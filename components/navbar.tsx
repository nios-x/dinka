"use client";
import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import Link from "next/link";
import { SettingsSlider } from "@/components/SettingsSlider";

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const originRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="top-0 z-30 fixed left-0">
        <div className="relative w-screen">
          {/* Top Navbar */}
          <div
            className="
            w-full border-b absolute top-0 left-0
            bg-white/70 dark:bg-zinc-900/70
            border-zinc-200/50 dark:border-zinc-800/50
            backdrop-blur-xl backdrop-saturate-150
            flex items-center p-3 z-30 justify-between px-4
          "
          >
            <div className="w-min px-1">
              <Camera size={28} className="text-zinc-800 dark:text-zinc-200" />
            </div>

            <Link href={"/"}>
              <div className="logo text-3xl mt-1 text-zinc-900 dark:text-zinc-100">
                dinka
              </div>
            </Link>

            <div className="w-min px-1">
              <SettingsSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

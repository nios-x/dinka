  "use client";
  import React, { useState, useRef, useEffect } from "react";
import { Camera } from 'lucide-react';
  import Link from "next/link";
  import { ThemeToggle } from "@/components/ThemeToggle";

  export default function Navbar() {
    const [open, setOpen] = useState(true);
    const sidebarRef = useRef(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const originRef = useRef<HTMLDivElement>(null);

    return (<>
    <div className=" top-0 z-30 fixed left-0 ">
      <div className="relative w-screen ">
        {/* Top Navbar */}
        <div className="w-full border-b absolute  top-0 left-0 bg-[#FAFAFA] dark:bg-[#121212] backdrop-blur-md backdrop-saturate-[1.8] flex items-center p-3  z-30 justify-between px-4">
          <div className="w-min px-1 "> <Camera size={28}/></div>
          <Link href={"/"}>
          <div className="logo text-3xl mt-1 dark:text-zinc-100">dinka</div>
          </Link> 
          <div className="w-min px-1 ">
            <ThemeToggle />
          </div>
        </div>
      </div>
      </div>
      </>
    );
  }

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "sonner";

import { toast } from "sonner";
import PersonCard from "@/components/Friends/block"; 
import Link from "next/link";
type Person = {
  id: string;
  name: string;
  pic: string;
};

export default function Page() {
  const [peoples, setPeoples] = useState<Person[]>([]);

  const handleFollow = async (id: string, name:string) => {
    const response = await fetch("/api/v1/friends/follow", {
      body: JSON.stringify({ friendId: id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setPeoples(peoples.filter((person) => person.id !== id));
      toast("You Followed: "+name)
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/friends/find");
      const data = await res.json();
      if (!res.ok || !data.people) {
        console.log("Failed to fetch people");
        return;
      }
      setPeoples(data.people);
    })();
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end pr-4 gap-x-2">
        <Link className="text-right bg-zinc-800 text-white px-3 py-2 rounded-full mt-5 active:bg-zinc-600/10 active:text-black text-xs font-bold" href={"/people"}>Your Friends</Link>
      </div>
      <Toaster/>

      {peoples.length === 0 && (
        <p className="text-center text-muted-foreground">No people found.</p>
      )}
     {peoples.map((e) => (
  <PersonCard
    key={e.id}
    person={e}
    primaryActionLabel="Follow"
    onPrimaryClick={() => handleFollow(e.id, e.name)}
    secondaryActionLabel="View"
  />
))}

    </div>
  );
}

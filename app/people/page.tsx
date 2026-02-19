"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "sonner";
import { toast } from "sonner";
import Link from "next/link";
import PersonCard from "@/components/Friends/block"; // adjust path if needed



type Person = {
  id: string;
  name: string;
  pic: string;
};
export default function Page() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [requests, setRequests] = useState<Person[]>([]);

  const handleUnFollow = async (id: string, name: string) => {
    const response = await fetch("/api/v1/friends/unfollow", {
      body: JSON.stringify({ friendId: id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setPeoples((prev) => prev.filter((person) => person.id !== id));
      toast("You Unfollowed: " + name, { position: "top-center" });
    }
  };
  const handleFollow = async (id: string, name: string, pic: string) => {
    const response = await fetch("/api/v1/friends/follow", {
      body: JSON.stringify({ friendId: id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to accept request:", error);
      return;
    }
    setRequests((prev) => prev.filter((person) => person.id !== id))
    setPeoples((prev) => [...prev, { id, name, pic }]);

    toast("You Followed: " + name, { position: "top-center" });
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/friends");
      const data = await res.json();
      if (!res.ok || !data.people) {
        console.log("Failed to fetch people");
        return;
      }
      setPeoples(data.people);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/friends/requestscame");
      const data = await res.json();
      if (!res.ok || !data.people) {
        console.log("Failed to fetch people");
        return;
      }
      setRequests(data.people);
    })();
  }, []);
  const handleReject = async (id: string, name: string) => {
    const response = await fetch("/api/v1/friends/reject", {
      body: JSON.stringify({ friendId: id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setRequests((prev) => prev.filter((person) => person.id !== id));
      toast("You Rejected: " + name, { position: "top-center" });
    } else {
      const error = await response.text();
      console.error("Failed to reject request:", error);
    }
  };
  return (
    <div className="w-full space-y-4 dark:bg-[#121212] min-h-screen">
      <div className="flex justify-end pr-4 gap-x-2">
        <Link className="text-right bg-zinc-800 text-white px-3 py-2 rounded-full mt-5 active:bg-zinc-600/10 active:text-black text-xs font-bold" href={"/people/find"}>Find Friends</Link>
        <Link className="text-right bg-zinc-800 text-white px-3 py-2 rounded-full mt-5 active:bg-zinc-600/10 active:text-black text-xs font-bold" href={"/people/requested"}>Requested</Link>
      </div>
      <Toaster />
      {requests.length !== 0 && (
        <h2 className=" p-2 font-bold">Confirm Requests</h2>
      )}
      {requests.map((e) => (
        <PersonCard
          key={e.id}
          person={e}
          primaryActionLabel="Accept"
          onPrimaryClick={() => handleFollow(e.id, e.name, e.pic)}
          onSecondaryClick={() => handleReject(e.id, e.name)}
          secondaryActionLabel="Reject"
        />
      ))}
      {peoples.length === 0 && (
        <p className="text-center text-muted-foreground pt-14">No people found.</p>
      )}

      {peoples.map((e) => (
        <PersonCard
          key={e.id}
          person={e}
          primaryActionLabel="View"
          secondaryActionLabel="Unfollow"
          onSecondaryClick={() => handleUnFollow(e.id, e.name)}
        />
      ))}

    </div>
  );
}

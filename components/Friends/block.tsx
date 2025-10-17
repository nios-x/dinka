"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Link from "next/link";
type Person = {
  id: string;
  name: string;
  pic: string;
};

type Props = {
  person: Person;
  primaryActionLabel?: string;
  onPrimaryClick?: () => void;
  secondaryActionLabel?: string;
  onSecondaryClick?: () => void;
};

export default function PersonCard({
  person,
  primaryActionLabel,
  onPrimaryClick,
  secondaryActionLabel,
  onSecondaryClick,
  
}: Props) {
  return (
    <div className="border rounded-2xl p-4 max-w-xl mx-3 py-1">
      <div className="flex gap-3 items-center ">
        <Link href={`/profile?id=${person.id}`}>
        <div className="w-10 h-10 rounded-full relative overflow-hidden">
          <Image src={person.pic} alt="" fill className="object-cover" />
        </div>
        </Link>
        <Link href={`/profile?id=${person.id}`}>
        <div className="font-medium">{person.name}</div>
        </Link>
      </div>
      <div className="flex justify-end gap-2 mt-3 ">
        {primaryActionLabel && (
          <Badge className="cursor-pointer text-md" onClick={onPrimaryClick}>
            {primaryActionLabel}
          </Badge>
        )}
        {secondaryActionLabel && (
          <Badge asChild variant="outline">
            <button onClick={onSecondaryClick}>
              {secondaryActionLabel}
            </button>
          </Badge>
        )}
      </div>
    </div>
  );
}

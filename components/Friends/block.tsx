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
    <div className="flex justify-between rounded-2xl  max-w-xl mx-3 py-1 ">
      <div className="flex gap-3 items-center w-max ">
        <Link href={`/profile?id=${person.id}`}>
        <div className="w-15 h-15 rounded-full relative overflow-hidden">
          <Image src={person.pic} alt="" fill className="object-cover" />
        </div>
        </Link>
        <Link href={`/profile?id=${person.id}`}>        
        <div className="font-bold text-[11px]">{person.name}</div>
        <div className="font-medium text-[14px]">{person.name}</div>
        </Link>
      </div>
      <div className="flex justify-end h-max gap-2 mt-3 ">
        {primaryActionLabel && (
          <Badge className="cursor-pointer text-sm" onClick={onPrimaryClick}>
            {primaryActionLabel}
          </Badge>
        )}
        {secondaryActionLabel && (
          <Badge asChild variant="outline" className="mr-2">
            <button onClick={onSecondaryClick}>
              {secondaryActionLabel}
            </button>
          </Badge>
        )}
      </div>
    </div>
  );
}

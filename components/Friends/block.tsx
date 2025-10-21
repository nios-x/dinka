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
          <Image src={person.pic||"https://imgs.search.brave.com/q-QoMPyZHgH3putURkfCdIQMa5Bg8luup8qs3GjbpQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tY2ly/Y2xlXzEyNTYwNDgt/MTI0OTkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"}  alt="" fill className="object-cover scale-[1.02]" />
        </div>
        </Link>
        <Link href={`/profile?id=${person.id}`}>        
        <div className="font-bold text-[11px]">{person.name || "Anonymous User"}</div>
        <div className="font-medium text-[14px]">{person.name || "Anonymous User"}</div>
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

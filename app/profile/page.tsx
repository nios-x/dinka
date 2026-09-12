"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileView from "@/components/profile/ProfileView";

/** `/profile?id=…`, falling back to your own profile when no id is given. */
function ProfilePage() {
  const params = useSearchParams();
  const { data: session } = useSession();
  const id = params?.get("id") || (session?.user as { id?: string } | undefined)?.id;

  if (!id) return null;
  return <ProfileView id={id} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProfilePage />
    </Suspense>
  );
}

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileView, { ProfileSkeleton } from "@/components/profile/ProfileView";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";

/** `/profile?id=…`, falling back to your own profile when no id is given. */
function ProfilePage() {
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const id = params?.get("id") || (session?.user as { id?: string } | undefined)?.id;

  // Reaching your own profile means waiting for the session. That wait used to
  // render nothing at all; it now shows the header that is coming.
  if (!id) {
    if (status === "loading") return <ProfileSkeleton />;
    return (
      <>
        <PageHeader title="Profile" />
        <EmptyState
          title="No profile to show"
          body="Sign in to see your own profile, or open someone's from the feed."
          action={{ label: "Sign in", href: "/login" }}
        />
      </>
    );
  }

  return <ProfileView id={id} />;
}

export default function Page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePage />
    </Suspense>
  );
}

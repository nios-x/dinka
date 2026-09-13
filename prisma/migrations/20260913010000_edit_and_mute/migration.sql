-- Post editing and muting.
--
-- Run with `npx prisma migrate deploy`.

ALTER TABLE "Post" ADD COLUMN "editedAt" TIMESTAMP(3);

-- Mute is its own table rather than a third "Relationship" value: that table is
-- unique on (srcid, destid) and stores one type per pair, so a mute recorded
-- there would overwrite the follow and silently unfollow the person.
CREATE TABLE "Mute" (
  "id"        SERIAL NOT NULL,
  "muterId"   TEXT NOT NULL,
  "mutedId"   TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Mute_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Mute_muterId_mutedId_key" ON "Mute"("muterId", "mutedId");
CREATE INDEX "Mute_muterId_idx" ON "Mute"("muterId");

ALTER TABLE "Mute" ADD CONSTRAINT "Mute_muterId_fkey"
  FOREIGN KEY ("muterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_mutedId_fkey"
  FOREIGN KEY ("mutedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

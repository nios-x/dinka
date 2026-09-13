-- Reports, post hiding, and OTP hardening.
--
-- Run with `npx prisma migrate deploy`.

-- ── OTP hardening ──────────────────────────────────────────────────────────
CREATE TYPE "OtpPurpose" AS ENUM ('Signup', 'Reset');

ALTER TABLE "OTPTable" ADD COLUMN "attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "OTPTable" ADD COLUMN "purpose" "OtpPurpose" NOT NULL DEFAULT 'Signup';

-- Codes were stored as plaintext digits and are now stored as bcrypt hashes.
-- Anything already in the table would compare as a wrong code forever, so it is
-- cleared: a pending signup simply asks for a new code, which costs one email.
DELETE FROM "OTPTable";

-- ── Reports ────────────────────────────────────────────────────────────────
CREATE TYPE "ReportReason" AS ENUM (
  'Spam', 'Harassment', 'Hate', 'Violence', 'SelfHarm', 'Nudity', 'Misinformation', 'Other'
);
CREATE TYPE "ReportStatus" AS ENUM ('Open', 'Reviewed', 'Dismissed');

CREATE TABLE "Report" (
  "id"         SERIAL NOT NULL,
  "reporterId" TEXT NOT NULL,
  "postId"     INTEGER NOT NULL,
  "reason"     "ReportReason" NOT NULL,
  "detail"     TEXT,
  "status"     "ReportStatus" NOT NULL DEFAULT 'Open',
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Report_reporterId_postId_key" ON "Report"("reporterId", "postId");
CREATE INDEX "Report_status_createdAt_idx" ON "Report"("status", "createdAt");
CREATE INDEX "Report_postId_idx" ON "Report"("postId");

ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey"
  FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Report" ADD CONSTRAINT "Report_postId_fkey"
  FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Post hiding ────────────────────────────────────────────────────────────
ALTER TABLE "Post" ADD COLUMN "hiddenAt" TIMESTAMP(3);
CREATE INDEX "Post_hiddenAt_idx" ON "Post"("hiddenAt");

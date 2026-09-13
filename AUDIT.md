# Dinka — engineering audit and remediation plan

**Date:** 2026-09-13
**Scope:** whole product — 51 API routes, 28 pages, the Prisma schema, the auth
layer, the design system.
**Verdict up front:** the design system and the React layer are not the problem.
Tokens, focus rings, skeletons, optimistic updates, reduced-motion and
reduced-transparency handling are all there and are better than most projects of
this size. What makes Dinka read as unfinished is a small number of things that
a user *feels* without being able to name:

1. A feature that lies to them (Report does nothing).
2. A feature they will eventually need and cannot reach (no password reset).
3. Anything they share looks broken everywhere they share it (no link previews).
4. The account system can be brute-forced, and one endpoint lets a stranger
   spend the project's money.

None of those are design problems. All of them are trust problems, and trust is
what separates a product from a demo.

---

## P0 — Security and trust. Ship before anything else.

### 1. The OTP can be brute-forced, and the OTP provider signs in existing accounts

`pages/api/auth/[...nextauth].ts`, provider `email-otp`.

- The code is 6 digits, stored in plaintext, valid for 5 minutes.
- There is **no attempt counter and no rate limit** anywhere in the app. A
  script can walk `000000`–`999999` against a pending signup inside the window.
- The provider looks the account up and, **if it already exists, signs the
  caller into it** rather than refusing. Today the only thing preventing account
  takeover is that `/api/v1/auth/signup` returns 409 for a known email, so no
  OTP is ever issued for an existing account.

That last point is the dangerous one, because **it makes password reset
unshippable until it is fixed.** A reset flow issues an OTP for an existing
email by definition; adding one on top of this provider converts a latent hole
into a working account-takeover chain.

**Fix:** hash the OTP at rest, consume it on first successful use, cap attempts
per email, rate limit issuance, and split the provider's two jobs so signing in
an existing account requires an explicit, separately-issued reset token.

### 2. `POST /api/v1/gemini/auto-post` is world-callable

No session check, no shared secret. It creates a user row, calls the Gemini API
and writes a post. Anyone with the URL can run up the bill and fill the feed.

It is also **triggered from the client** on every home page load with a 30%
probability (`app/page.tsx`). Machine-written filler in a social feed is the
most literal form of "cheap" the product has: every real user's timeline is
seeded with posts nobody wrote.

**Fix:** require `CRON_SECRET`, delete the client trigger, keep the endpoint for
a real scheduled job if wanted.

### 3. No rate limiting on anything

51 routes, zero limits. The expensive ones: OTP mail (cost + deliverability
reputation), post and comment creation, Cloudinary uploads, follow, and the
Gemini call above.

**Fix:** one small limiter keyed by user id or IP, applied to every write route,
tight on auth.

### 4. Report is a lie

`components/feed/PostCard.tsx:240`:

```tsx
<DropdownMenuItem onClick={() => toast.success("Thanks — we'll take a look")}>
```

Nothing is stored. Nobody looks at anything. A user who reports harassment is
told it was received. For a social product this is worse than having no Report
button at all, and in several jurisdictions a platform claiming to action
reports it does not receive is a liability, not just bad manners.

**Fix:** a `Report` table, a real endpoint, a threshold that hides content
pending review, and copy that promises only what the system does.

---

## P1 — Product gaps a real social app does not have

### 5. No password reset

Nothing in the codebase matches `forgot` or `reset`. An email-and-password user
who forgets it is locked out permanently, with no recovery path. The OTP table
and the mailer already exist; the flow does not.

**Depends on P0.1.** See above for why.

### 6. Nothing shared from Dinka has a link preview

`app/layout.tsx` declares `title`, `description`, `manifest`, `icons` — and no
`openGraph` or `twitter` block at all. Every link pasted into WhatsApp, Slack,
Discord, iMessage or X renders as a bare URL.

This is the single highest-leverage visual fix in the audit: it is how the
product looks to people who have not installed it yet, it costs one file plus
per-route metadata, and right now it is 100% absent.

**Fix:** root OG/Twitter defaults, `generateMetadata` on post, profile and tag
routes, and a dynamic OG image per post rendered with `next/og`.

### 7. PWA manifest is wrong in three ways

`public/manifest.json`: `start_url` and every icon are hardcoded to
`https://dinka.vercel.app/` (breaks on any other origin, including local),
`theme_color` is `#000000` against a warm off-white product, and one 192px icon
is declared twice — the second time as `512x512`, so the install prompt and
splash screen upscale a small PNG.

### 8. Post editing and mute do not exist

Both are table stakes.

Editing is text-only by design — swapping the photo under a post people have
already replied to rewrites a conversation after the fact, while fixing a typo
is what people actually want. Every edit stamps `editedAt` and the card shows
it; an invisible edit would mean a post's text is not evidence of anything.

Mute turned out **not** to be a third `Relationship` value, as first sketched
here. That table is unique on `(srcid, destid)` and holds one type per pair, so
recording a mute there would have overwritten the follow — silently unfollowing
the person you meant only to quieten. It needs its own table.

---

## P2 — Polish, performance, accessibility

### 9. Six raw `<img>` tags bypass the Cloudinary transform

`lib/media.ts` exists precisely because `images.unoptimized` is on, and it is
not used in `app/chat/page.tsx` (×2), `components/composer/Composer.tsx`,
`components/stories/StoryComposer.tsx`, `components/stories/StoryViewer.tsx`.
The story viewer and chat thread are the two most image-heavy surfaces in the
app, and both download full-size originals over mobile data.

### 10. Muted text fails contrast

`--ink-3` (`#8a847c`) on the post surface is **3.2:1**. WCAG AA wants 4.5:1 for
text that size. It carries handles, timestamps and every secondary label in the
feed. Darkening to roughly `#6f6a62` clears the bar and, as a side effect,
removes most of the "washed out / grey" quality the product was described as
having.

### 11. `.safe-b` silently eats bottom padding

`.safe-b` sets `padding-bottom` from the same cascade layer as Tailwind's
`pb-*`, declared later, so it wins — and resolves to `0px` on any device with no
home-indicator inset. Fixed in the dock already; still live in
`app/chat/page.tsx:289` and `components/call/CallOverlay.tsx:372`.

### 12. `app/zz-preview/` is a development route inside the app directory

It is untracked today, so it has not shipped, but it is one `git add .` from
being a public page.

---

## What shipped

Everything above, in the order below, verified with `tsc --noEmit` and a
production `next build` (78 static pages, exit 0).

| # | Item | Where |
|---|---|---|
| P0.1 | OTP hashed, single-use, 5-attempt cap, purpose-scoped | `lib/otp.ts`, `pages/api/auth/[...nextauth].ts`, `app/api/v1/auth/signup/route.ts` |
| P0.2 | Gemini endpoint behind `CRON_SECRET`; client trigger deleted | `app/api/v1/gemini/auto-post/route.ts`, `app/page.tsx` |
| P0.3 | Rate limiting, applied to auth, posts, comments, stories, follows, reports | `lib/rate-limit.ts` + call sites |
| P0.4 | Reports stored, reasons collected, auto-hide at 3 distinct reporters | `app/api/v1/reports/route.ts`, `components/feed/ReportDialog.tsx`, 5 feed queries |
| P1.5 | Password reset, enumeration-safe | `app/forgot/`, `app/api/v1/auth/reset/route.ts`, `components/auth/ResetForm.tsx` |
| P1.6 | OG/Twitter metadata + generated per-post preview images | `app/layout.tsx`, `app/opengraph-image.tsx`, `app/postid/[id]/opengraph-image.tsx` |
| P1.7 | Manifest: relative URLs, brand colour, scalable icons, shortcuts | `public/manifest.json`, `public/icon.svg` |
| P1.8 | Post editing with an edit mark; mute with its own table and an undo list | `app/api/v1/posts/edit/route.ts`, `app/api/v1/users/mute/route.ts`, `components/settings/MutedAccounts.tsx` |
| P2.9 | Chat and story media routed through the Cloudinary transform | `app/chat/page.tsx`, `components/stories/StoryViewer.tsx` |
| P2.10 | `--ink-3` raised to AA in both themes (3.2:1 → 4.6:1, 4.5:1 → 5.1:1) | `app/globals.css` |
| P2.11 | `.safe-b` padding collisions | `app/chat/page.tsx`, `components/call/CallOverlay.tsx` |
| P2.12 | `app/zz-preview/` git-ignored | `.gitignore` |

**Two migrations are written but not applied.** They touch a live database, so
running them is a deliberate act, not a side effect of this work:

```
npx prisma migrate deploy
```

`20260913000000_reports_and_otp_hardening` — the `Report` table, `Post.hiddenAt`,
OTP `attempts`/`purpose`, and a `DELETE FROM "OTPTable"` (codes were plaintext
and are now hashes; a pending signup asks for a new code).

`20260913010000_edit_and_mute` — `Post.editedAt` and the `Mute` table.

Until they run, the new endpoints will fail against the old schema.

Two environment variables are new: `CRON_SECRET` (without it the bot endpoint
refuses everything, which is the safe default) and `NEXT_PUBLIC_SITE_URL` (link
previews resolve against it).

## Order of work

P0.2 and P0.3 first, because they are self-contained and stop active bleeding.
Then P0.1, which unblocks P1.5. Then P0.4 with its migration. Then P1.6, which
is the most visible change per line of code in the entire list. Then P2, which
is a sweep.

Two things in this plan touch the database and need a migration run against a
real `DATABASE_URL` (`Report`, and the OTP columns). Those are written as
migrations and left for a deliberate `prisma migrate deploy` rather than run
from here.

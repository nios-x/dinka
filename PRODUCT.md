# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people in their late teens to early thirties using Dinka on a phone, in short bursts through the day — commute, queue, bed — to see what people they follow posted, react, and reply. Secondary: **creators** on the same app who post regularly and want to know whether their work is landing (reach, engagement, which post worked).

The two are the same account type, not separate roles. Every user can post; creator tooling is a deeper layer of the same profile, not a separate product.

## Product Purpose

Dinka is a social network: post text and images, follow people, react, comment, DM, and call. It exists so a small circle of people can keep up with each other without the feed becoming a stranger-driven attention machine. Success is a user who returns daily and posts, not one who only scrolls.

## Positioning

Followed-first feed with creator-grade instrumentation attached to an ordinary personal account. The reach/engagement numbers a normal social app hides behind a business-account upgrade are simply part of your own profile here.

## Operating Context

- Phone-first, one-handed, thumb reach at the bottom of the screen. Installed as a PWA.
- Sessions are short and interruption-heavy; state must survive backgrounding.
- Real-time paths exist: DMs and voice/video calls over a WebSocket signalling server (`NEXT_PUBLIC_BACKEND`).
- Desktop is a genuine secondary scene (browser tab, wider layout), not a stretched phone.

## Capabilities and Constraints

Confirmed and shipping:
- Auth: email/password with OTP email verification, plus Google OAuth (NextAuth, JWT session).
- Posts: text + single image, `Public` or `Followers` visibility, likes, comments, delete.
- Social graph: follow / unfollow / follow-requests / block (`Relations` with `Follower`/`Blocked`).
- DMs (`Chats`) and voice/video calls (WebRTC via the signalling server).
- Gemini-generated auto-posts (`@google/generative-ai`) that seed the feed.
- Notifications and seen-post tracking exist in the schema.

Confirmed this cycle (built on an extended Prisma schema):
- Stories with 24h expiry and view tracking; story replies.
- Notification center over the existing `Notification` model.
- Bookmarks and named collections.
- Emoji reactions beyond a single like; polls; reels (vertical video); reposts/quotes; threaded comment replies.
- Hashtags, mentions, global search, explore, trending.
- Creator insights: followers, engagement rate, reach, impressions, top posts.

Technical constraints:
- Next.js 15 App Router, React 19, Tailwind v4 (CSS-first `@theme`), Prisma + PostgreSQL (Neon), Cloudinary for media, `next-pwa` service worker.
- `images.unoptimized: true` — no Next image optimizer; media arrives from Cloudinary.
- Prisma client is generated to `generated/prisma`.
- Schema changes ship as a migration the user runs; this environment has no database access.

Terminology: **post**, **story**, **reel**, **reaction**, **follow** (not "friend"), **space** is not used.

## Brand Commitments

- Name: **Dinka**. Tagline in use: "To Be Social".
- The wordmark is set in a self-hosted display face already in the repo (`fonts/file2.89a51fcc.woff2`, exposed as `font-family: logo`) and is lowercase: `dinka`. This is the one visual element carried forward unchanged.
- Voice: plain, warm, second person, no hype and no growth-hacking language.

## Evidence on Hand

- A working app with real routes, API surface, and Prisma schema (the functional spec).
- `fakerr.js` seeds synthetic users/posts; all demo content in this codebase is synthetic and must stay labeled as such.
- No real user counts, revenue, press, testimonials, or partner logos exist. None may be invented; the marketing surface speaks only about what the product does.

## Product Principles

1. **The people you follow come first.** Algorithmic and discovery surfaces are opt-in destinations (`/explore`, `/reels`), never the default feed.
2. **Posting is the success metric.** The composer is reachable from every screen in one thumb movement, and never more than one screen deep.
3. **Your own numbers belong to you.** Insights are part of the personal profile, not an upsell.
4. **Short bursts, no penalty.** Every surface is resumable; nothing punishes leaving mid-action.
5. **Synthetic stays labeled.** Seeded and AI-authored content is visibly marked, never passed off as a person.

## Accessibility & Inclusion

- One-handed phone use is the design target: primary actions in the bottom third, minimum 44×44px touch targets.
- Full keyboard operability and visible focus on desktop.
- Light and dark themes both first-class; theme follows the system by default.
- WCAG AA contrast for text and interactive elements.

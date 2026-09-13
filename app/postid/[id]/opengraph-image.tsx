import { ImageResponse } from "next/og";
import prisma from "@/lib/prisma";
import { still } from "@/lib/media";

/**
 * The link preview for one post.
 *
 * This is the whole product for anyone who has not signed up: a link lands in
 * a group chat and this image is the only thing that argues for opening it. So
 * it carries the actual words of the post and who wrote them, not a logo.
 *
 * A post with a photo gets the photo, dimmed, with the text over it. Anything
 * else gets the text on the product's own paper.
 *
 * Note: a follower-only post never renders its contents here. Unfurling
 * happens unauthenticated — the platform fetching the preview is not signed in
 * and is very often not even the person who was sent the link — so anything
 * this image shows is effectively public.
 */

export const alt = "A post on Dinka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  // Next 15 hands these to metadata routes as a promise; awaiting a plain
  // object is harmless, so this works on either.
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await params;
  const postId = Number(id);

  const post = Number.isFinite(postId)
    ? await prisma.post.findUnique({
        where: { id: postId },
        select: {
          title: true,
          mediaurl: true,
          mediaType: true,
          visiblity: true,
          hiddenAt: true,
          author: { select: { name: true, username: true } },
        },
      })
    : null;

  const isPublic = post && post.visiblity === "Public" && !post.hiddenAt;
  const author = isPublic ? (post.author?.name ?? "Someone") : "Dinka";
  const handle = isPublic && post.author?.username ? `@${post.author.username}` : "";

  const body = isPublic
    ? post.title.slice(0, 220)
    : "A post on Dinka — sign in to read it.";

  // Cloudinary resizes it; handing the OG renderer a 4000px original is how
  // this route times out.
  const photo = isPublic && post.mediaurl ? still(post.mediaurl, 1200) : null;

  // Long posts step down rather than overflowing the card.
  const fontSize = body.length > 160 ? 40 : body.length > 90 ? 50 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: photo ? "#08070a" : "#f4f1ec",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {photo && (
          <>
            <img
              src={photo}
              alt=""
              width={size.width}
              height={size.height}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Text over a photograph needs its own contrast, not luck. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                background: "linear-gradient(180deg, rgba(8,7,10,0.45) 0%, rgba(8,7,10,0.88) 100%)",
              }}
            />
          </>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: photo ? "#ffffff" : "#17130f",
              color: photo ? "#17130f" : "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            d
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: photo ? "#ffffff" : "#17130f",
              letterSpacing: "-0.02em",
            }}
          >
            dinka
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, position: "relative" }}>
          <div
            style={{
              fontSize,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              color: photo ? "#ffffff" : "#17130f",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {body}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: photo ? "rgba(255,255,255,0.95)" : "#17130f",
              }}
            >
              {author}
            </div>
            {handle && (
              <div style={{ fontSize: 26, color: photo ? "rgba(255,255,255,0.7)" : "#8a847c" }}>
                {handle}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";

/**
 * The default link preview.
 *
 * Rendered rather than stored as a PNG so it follows the product's type and
 * colour instead of being a screenshot somebody has to remember to update.
 * Anything the app does not override — the landing page, settings, a tag page
 * — unfurls with this.
 */

export const runtime = "edge";
export const alt = "Dinka — To Be Social";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ec",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* The same warm light the app puts behind its glass. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 760,
            height: 600,
            background: "radial-gradient(circle, rgba(18,179,159,0.28), rgba(18,179,159,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -200,
            width: 720,
            height: 560,
            background: "radial-gradient(circle, rgba(99,85,200,0.22), rgba(99,85,200,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#17130f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            d
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#17130f", letterSpacing: "-0.02em" }}>
            dinka
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#17130f",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            To be social.
          </div>
          <div style={{ fontSize: 32, color: "#55504a", maxWidth: 820, lineHeight: 1.35 }}>
            Posts, stories, reels and messages — built around the people you actually follow.
          </div>
        </div>
      </div>
    ),
    size
  );
}

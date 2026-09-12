/**
 * Dinka's authored icon set.
 *
 * Drawn on a 24px grid, 1.7 stroke, round caps and joins — the same hand as the
 * corner language. Each dock icon has a `filled` state so the active tab reads
 * as a glazed tile rather than a color swap. Everything outside the dock and
 * these signature marks comes from lucide-react, which shares the grid.
 */
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  /** Dock icons carry a solid state for the active tab. */
  filled?: boolean;
  size?: number;
};

function base(size: number | undefined, props: React.SVGProps<SVGSVGElement>) {
  return {
    width: size ?? 24,
    height: size ?? 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

/** Home — a kiln arch, not a house. */
export function HomeIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M4 10.6c0-.9.4-1.7 1.1-2.2l5.6-4.3a2 2 0 0 1 2.6 0l5.6 4.3c.7.5 1.1 1.3 1.1 2.2V18a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 18v-7.4Z"
        fill={filled ? "currentColor" : "none"}
        opacity={filled ? 0.16 : 1}
      />
      <path d="M4 10.6c0-.9.4-1.7 1.1-2.2l5.6-4.3a2 2 0 0 1 2.6 0l5.6 4.3c.7.5 1.1 1.3 1.1 2.2V18a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 18v-7.4Z" />
      <path d="M9.6 20.6v-4.9a2.4 2.4 0 0 1 4.8 0v4.9" strokeWidth={filled ? 2 : 1.7} />
    </svg>
  );
}

/** Explore — a potter's wheel seen from above. */
export function ExploreIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="8.4" fill={filled ? "currentColor" : "none"} opacity={filled ? 0.16 : 1} />
      <circle cx="12" cy="12" r="8.4" />
      <path
        d="m14.9 9.1-1.5 4.2a1 1 0 0 1-.6.6l-4.2 1.5a.5.5 0 0 1-.6-.6l1.5-4.2a1 1 0 0 1 .6-.6l4.2-1.5a.5.5 0 0 1 .6.6Z"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

/** Reels — a stacked film tile. */
export function ReelsIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" fill={filled ? "currentColor" : "none"} opacity={filled ? 0.16 : 1} />
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <path d="M3.7 8.9h16.6" />
      <path d="m8.4 3.6 2.7 5.2M14.1 3.6l2.7 5.2" />
      <path d="M10.6 12.9v3.4a.6.6 0 0 0 .93.5l2.7-1.7a.6.6 0 0 0 0-1l-2.7-1.7a.6.6 0 0 0-.93.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Messages — a thrown vessel with a spout. */
export function MessagesIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.6 9.6 0 0 1-2.6-.35L4.6 20.2a.5.5 0 0 1-.64-.63l1.3-3.7A7 7 0 0 1 3.6 11.6c0-4.1 3.8-7.4 8.4-7.4s8.4 3.3 8.4 7.4Z"
        fill={filled ? "currentColor" : "none"}
        opacity={filled ? 0.16 : 1}
      />
      <path d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.6 9.6 0 0 1-2.6-.35L4.6 20.2a.5.5 0 0 1-.64-.63l1.3-3.7A7 7 0 0 1 3.6 11.6c0-4.1 3.8-7.4 8.4-7.4s8.4 3.3 8.4 7.4Z" />
    </svg>
  );
}

/** Compose — the throwing gesture: a mark being pressed into clay. */
export function ComposeIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)} strokeWidth={1.9}>
      <path d="M12 5.6v12.8M5.6 12h12.8" />
    </svg>
  );
}

/** Notifications — a struck bell. */
export function BellIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M18.3 16.2H5.7c-.7 0-1.1-.8-.6-1.3.9-1 1.4-2.3 1.4-3.7v-1.5a5.5 5.5 0 0 1 11 0v1.5c0 1.4.5 2.7 1.4 3.7.5.5.1 1.3-.6 1.3Z"
        fill={filled ? "currentColor" : "none"}
        opacity={filled ? 0.16 : 1}
      />
      <path d="M18.3 16.2H5.7c-.7 0-1.1-.8-.6-1.3.9-1 1.4-2.3 1.4-3.7v-1.5a5.5 5.5 0 0 1 11 0v1.5c0 1.4.5 2.7 1.4 3.7.5.5.1 1.3-.6 1.3Z" />
      <path d="M10.1 19.2a2.2 2.2 0 0 0 3.8 0" />
    </svg>
  );
}

/** Bookmark — a shelf tag. */
export function BookmarkIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M6.6 5.4c0-1 .8-1.8 1.8-1.8h7.2c1 0 1.8.8 1.8 1.8v14.2a.6.6 0 0 1-.94.5L12 16.6l-4.46 3.5a.6.6 0 0 1-.94-.5V5.4Z"
        fill={filled ? "currentColor" : "none"}
      />
      <path d="M6.6 5.4c0-1 .8-1.8 1.8-1.8h7.2c1 0 1.8.8 1.8 1.8v14.2a.6.6 0 0 1-.94.5L12 16.6l-4.46 3.5a.6.6 0 0 1-.94-.5V5.4Z" />
    </svg>
  );
}

/** Heart — the ember signal. */
export function HeartIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M12 20.2s-7.7-4.4-7.7-9.6A4.3 4.3 0 0 1 12 7.9a4.3 4.3 0 0 1 7.7 2.7c0 5.2-7.7 9.6-7.7 9.6Z"
        fill={filled ? "currentColor" : "none"}
      />
      <path d="M12 20.2s-7.7-4.4-7.7-9.6A4.3 4.3 0 0 1 12 7.9a4.3 4.3 0 0 1 7.7 2.7c0 5.2-7.7 9.6-7.7 9.6Z" />
    </svg>
  );
}

/** Comment — a reply bubble tuned to the vessel icon. */
export function CommentIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.6 9.6 0 0 1-2.6-.35L4.6 20.2a.5.5 0 0 1-.64-.63l1.3-3.7A7 7 0 0 1 3.6 11.6c0-4.1 3.8-7.4 8.4-7.4s8.4 3.3 8.4 7.4Z" />
    </svg>
  );
}

/** Repost — two arcs circling a wheel. */
export function RepostIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M4.6 9.4a5 5 0 0 1 5-5h7.3" />
      <path d="m14.4 1.9 2.9 2.5-2.9 2.5" />
      <path d="M19.4 14.6a5 5 0 0 1-5 5H7.1" />
      <path d="m9.6 22.1-2.9-2.5 2.9-2.5" />
    </svg>
  );
}

/** Share — a mark leaving the tile. */
export function ShareIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 15.4V3.9" />
      <path d="m8.3 7.2 3.7-3.3 3.7 3.3" />
      <path d="M7 10.6H6.2A2.2 2.2 0 0 0 4 12.8v5.4a2.2 2.2 0 0 0 2.2 2.2h11.6a2.2 2.2 0 0 0 2.2-2.2v-5.4a2.2 2.2 0 0 0-2.2-2.2H17" />
    </svg>
  );
}

/** Insights — three fired bars. */
export function InsightsIcon({ filled, size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3.6" y="13.4" width="4.4" height="7" rx="1.6" fill={filled ? "currentColor" : "none"} opacity={filled ? 0.16 : 1} />
      <rect x="3.6" y="13.4" width="4.4" height="7" rx="1.6" />
      <rect x="9.8" y="8.4" width="4.4" height="12" rx="1.6" fill={filled ? "currentColor" : "none"} opacity={filled ? 0.16 : 1} />
      <rect x="9.8" y="8.4" width="4.4" height="12" rx="1.6" />
      <rect x="16" y="3.6" width="4.4" height="16.8" rx="1.6" fill={filled ? "currentColor" : "none"} opacity={filled ? 0.16 : 1} />
      <rect x="16" y="3.6" width="4.4" height="16.8" rx="1.6" />
    </svg>
  );
}

/** Poll — stacked measure bars. */
export function PollIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3.4" y="5" width="17.2" height="4.6" rx="2.3" />
      <rect x="3.4" y="14.4" width="11.4" height="4.6" rx="2.3" />
    </svg>
  );
}

/**
 * The Dinka mark — a thrown ring, opened at the top where the potter's
 * thumb entered. Used wherever the wordmark is too wide.
 */
export function DinkaMark({ size = 28, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M16 3.2a12.8 12.8 0 1 1-9.05 3.75"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="4.6" fill="currentColor" />
    </svg>
  );
}

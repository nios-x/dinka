import {
  HomeIcon,
  ExploreIcon,
  ReelsIcon,
  MessagesIcon,
  BellIcon,
  BookmarkIcon,
  InsightsIcon,
} from "@/components/icons";
import { UsersRound, Settings } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  /** Accepts `filled` so the active tab reads as a glazed mark. */
  Icon: React.ComponentType<{ filled?: boolean; size?: number; className?: string }>;
  /** Which badge count, if any, lights this item. */
  badge?: "notifications" | "messages";
  /** Matches child routes too (`/profile/x` still lights Profile). */
  match?: RegExp;
};

/** The left rail on desktop, in reading order. */
export const RAIL_ITEMS: NavItem[] = [
  { href: "/", label: "Home", Icon: HomeIcon, match: /^\/$/ },
  { href: "/explore", label: "Explore", Icon: ExploreIcon, match: /^\/(explore|tag|search)/ },
  { href: "/reels", label: "Reels", Icon: ReelsIcon, match: /^\/reels/ },
  { href: "/notifications", label: "Notifications", Icon: BellIcon, badge: "notifications", match: /^\/notifications/ },
  { href: "/chats", label: "Messages", Icon: MessagesIcon, badge: "messages", match: /^\/(chats|chat)/ },
  { href: "/saved", label: "Saved", Icon: BookmarkIcon, match: /^\/saved/ },
  { href: "/insights", label: "Insights", Icon: InsightsIcon, match: /^\/insights/ },
  { href: "/people", label: "People", Icon: UsersRound as never, match: /^\/people/ },
  { href: "/settings", label: "Settings", Icon: Settings as never, match: /^\/settings/ },
];

/** The phone dock. Compose sits in the middle slot and is rendered separately. */
export const DOCK_ITEMS: NavItem[] = [
  { href: "/", label: "Home", Icon: HomeIcon, match: /^\/$/ },
  { href: "/explore", label: "Explore", Icon: ExploreIcon, match: /^\/(explore|tag|search|reels)/ },
  { href: "/chats", label: "Messages", Icon: MessagesIcon, badge: "messages", match: /^\/(chats|chat)/ },
];

export function isActive(item: NavItem, pathname: string): boolean {
  if (item.match) return item.match.test(pathname);
  return pathname === item.href;
}

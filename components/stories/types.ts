export type Story = {
  id: number;
  kind: "Image" | "Video" | "Text";
  mediaUrl: string | null;
  caption: string | null;
  bgFrom: string | null;
  bgTo: string | null;
  createdAt: string;
  expiresAt: string;
  seen: boolean;
  viewCount?: number;
};

export type StoryGroup = {
  user: {
    id: string;
    name: string | null;
    username?: string | null;
    pic?: string | null;
  };
  stories: Story[];
  /** True when every story in the group has been viewed. */
  allSeen: boolean;
  /** Your own group is pinned first and shows the add control. */
  isMe: boolean;
};

/** Text stories are drawn on one of these gradients when none is stored. */
export const STORY_GRADIENTS: { from: string; to: string; label: string }[] = [
  { from: "#17130F", to: "#4A3F35", label: "Ink" },
  { from: "#12B39F", to: "#0B7F8C", label: "Teal" },
  { from: "#E0463C", to: "#B8321F", label: "Rose" },
  { from: "#C8891B", to: "#9A5B12", label: "Amber" },
  { from: "#6355C8", to: "#3B2F8F", label: "Iris" },
  { from: "#F4F1EC", to: "#D5CFC5", label: "Bone" },
];

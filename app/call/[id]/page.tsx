import { redirect } from "next/navigation";

/**
 * Calls are an overlay on top of the app now, not a page of their own, so this
 * old route just returns you to your conversations.
 */
export default function Page() {
  redirect("/chats");
}

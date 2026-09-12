import { redirect } from "next/navigation";

/**
 * Outgoing follows now live as a tab on /people rather than their own route.
 * The old link keeps working.
 */
export default function Page() {
  redirect("/people");
}

import { redirect } from "next/navigation";

/** `/user` was the old name for your own profile. */
export default function Page() {
  redirect("/profile");
}

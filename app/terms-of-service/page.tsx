import type { Metadata } from "next";
import LegalPage, { Clause, Points } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "The rules for using Dinka, in plain language.",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      updated="13 September 2026"
      intro="The rules for using Dinka. They are short on purpose: use the product for what it is for, treat other people decently, and keep control of your own work."
    >
      <Clause title="Your account">
        <p>
          You need an email address and a password, or a Google account. You are responsible for
          keeping it secure, and for everything posted from it. One person, one account — do not
          impersonate somebody else.
        </p>
      </Clause>

      <Clause title="Your content stays yours">
        <p>
          You keep ownership of everything you post. You give us only the permission needed to run
          the product: to store your posts, and to show them to the people you chose to show them
          to. Delete a post and that permission ends with it.
        </p>
      </Clause>

      <Clause title="What is not allowed">
        <Points
          items={[
            "Harassing, threatening or targeting other people.",
            "Posting someone else's private information.",
            "Sexual content involving minors, in any form. This is reported, not just removed.",
            "Content you have no right to post.",
            "Automated scraping, bulk account creation, or anything that degrades the service for others.",
          ]}
        />
        <p>
          Accounts that break these rules can be suspended or removed. You can report a post or an
          account from its menu.
        </p>
      </Clause>

      <Clause title="Leaving">
        <p>
          You can delete your account at any time from Settings, and it takes your posts, messages
          and stories with it. We may close an account that breaks these terms.
        </p>
      </Clause>

      <Clause title="No warranty">
        <p>
          Dinka is provided as it is. We do not guarantee that it will be available without
          interruption, or that nothing will ever be lost. Keep your own copy of anything you cannot
          afford to lose.
        </p>
      </Clause>

      <Clause title="Changes">
        <p>
          If these terms change in a way that affects you, the date at the top of this page changes
          and we will say so in the product before it takes effect.
        </p>
      </Clause>
    </LegalPage>
  );
}

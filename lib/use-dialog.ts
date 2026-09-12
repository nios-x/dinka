"use client";

import React from "react";

/**
 * The behaviour every hand-rolled overlay in the app owes the keyboard.
 *
 * The composer, the command palette and the story composer are portalled
 * sheets rather than Radix dialogs, so none of Radix's dismiss/trap/restore
 * behaviour comes for free. This supplies it in one place:
 *
 * - Escape closes, from anywhere including inside a field.
 * - Tab is held inside the panel, so focus cannot wander onto the feed behind.
 * - Focus returns to whatever opened the sheet when it closes.
 * - The page behind stops scrolling while it is open.
 *
 * Radix-based dialogs (`ui/dialog`, `ui/alert-dialog`, `ui/drawer`) already do
 * all of this; they should not use this hook.
 */
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useDialog(
  open: boolean,
  onClose: () => void,
  panelRef: React.RefObject<HTMLElement | null>
) {
  const opener = React.useRef<HTMLElement | null>(null);

  // Held in a ref so a caller whose close handler closes over changing state —
  // the composer's does, over its draft — does not re-run the whole effect on
  // every keystroke and yank focus back to whatever opened the sheet.
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;

    opener.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
        return;
      }

      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      // Returning focus to a control that has since unmounted would throw the
      // caret to the top of the document, so check it is still connected.
      const back = opener.current;
      if (back?.isConnected) back.focus({ preventScroll: true });
    };
  }, [open, panelRef]);
}

/**
 * Post text is plain text in the database; hashtags, mentions and links become
 * real navigation at render time. One tokenizer, used by both the renderer and
 * the server-side hashtag indexer, so what you see linked is what got indexed.
 */

export type Token =
  | { type: "text"; value: string }
  | { type: "tag"; value: string; raw: string }
  | { type: "mention"; value: string; raw: string }
  | { type: "link"; value: string; raw: string };

// Tags and handles allow letters, digits and underscore; links are http(s) or bare www.
const PATTERN =
  /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)|#([\p{L}\p{N}_]{1,64})|@([a-zA-Z0-9_.]{2,32})/gu;

export function tokenize(input: string): Token[] {
  const src = input ?? "";
  const out: Token[] = [];
  let last = 0;

  for (const m of src.matchAll(PATTERN)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ type: "text", value: src.slice(last, at) });

    if (m[1]) {
      out.push({ type: "link", value: m[1], raw: m[0] });
    } else if (m[2]) {
      out.push({ type: "tag", value: m[2].toLowerCase(), raw: m[0] });
    } else if (m[3]) {
      // A trailing period is sentence punctuation, not part of the handle.
      const handle = m[3].replace(/\.+$/, "");
      if (handle.length >= 2) out.push({ type: "mention", value: handle, raw: `@${handle}` });
      else out.push({ type: "text", value: m[0] });
    }
    last = at + m[0].length;
  }

  if (last < src.length) out.push({ type: "text", value: src.slice(last) });
  return out;
}

/** Unique, lowercased hashtags in a body — what the indexer writes. */
export function extractTags(input: string, limit = 12): string[] {
  const seen = new Set<string>();
  for (const t of tokenize(input)) {
    if (t.type === "tag" && !seen.has(t.value)) seen.add(t.value);
    if (seen.size >= limit) break;
  }
  return [...seen];
}

/** Unique handles mentioned in a body — what the notifier resolves. */
export function extractMentions(input: string, limit = 12): string[] {
  const seen = new Set<string>();
  for (const t of tokenize(input)) {
    if (t.type === "mention" && !seen.has(t.value)) seen.add(t.value.toLowerCase());
    if (seen.size >= limit) break;
  }
  return [...seen];
}

/** Normalizes a bare `www.` link into something an href can use. */
export function href(link: string): string {
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

/** Links are shown without the protocol and truncated; the href stays whole. */
export function prettyLink(link: string, max = 42): string {
  const bare = link.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  return bare.length > max ? `${bare.slice(0, max - 1)}…` : bare;
}

/**
 * Media URLs.
 *
 * Everything uploaded here lands on Cloudinary, which serves images and video
 * from the same host under different resource types:
 *
 *   https://res.cloudinary.com/<cloud>/image/upload/<version>/<id>.jpg
 *   https://res.cloudinary.com/<cloud>/video/upload/<version>/<id>.mp4
 *
 * A video URL cannot go in an `<img>` — the element has nothing to decode and
 * renders as a broken image. Cloudinary will hand back a still frame from the
 * same asset if you ask for an image extension, which is what `still()` does,
 * so a grid tile or a notification thumbnail can stay a plain `<img>`.
 *
 * The transforms also cap the delivered pixels. `images.unoptimized` is on for
 * this project, so without them a 4000px original is downloaded whole to fill a
 * 48px thumbnail.
 */

const CLOUDINARY = /^(https?:\/\/res\.cloudinary\.com\/[^/]+)\/(image|video)\/upload\/(.+)$/i;

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i;

/** True for anything that needs a `<video>` element rather than an `<img>`. */
export function isVideo(url: string | null | undefined, type?: string | null): boolean {
  if (type?.startsWith("video")) return true;
  if (!url) return false;
  return VIDEO_EXT.test(url) || /\/video\/upload\//i.test(url);
}

/**
 * A still image for `url`, capped at `width` device pixels.
 *
 * Returns null when no still can be produced — a video on some other host —
 * which is the caller's cue to fall back to a `<video>` element.
 */
export function still(url: string, width: number): string | null {
  const match = url.match(CLOUDINARY);

  if (!match) return isVideo(url) ? null : url;

  const [, base, kind, rest] = match;
  const video = kind === "video";

  // `so_0` pins the frame to the start of the clip; without it the frame
  // chosen can move if the asset is re-encoded.
  const transform = `c_limit,w_${width},q_auto,f_auto${video ? ",so_0" : ""}`;

  // Cloudinary reads the extension as the format to convert *to*, so a video
  // asked for as .jpg comes back as a frame from it.
  const path = video ? rest.replace(/\.[a-z0-9]+($|\?)/i, ".jpg$1") : rest;

  return `${base}/${kind}/upload/${transform}/${path}`;
}

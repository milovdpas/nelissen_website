/**
 * Which part of a photo to keep when it is cropped.
 *
 * Cards and carousel slides are landscape boxes, and most of these photos were
 * shot on a phone in portrait. `object-fit: cover` then crops to the middle by
 * default, which is wrong more often than it is right: the tiles are usually on
 * the floor (bottom) or on a wall above a bath (top), and the middle is the
 * least interesting part of the frame.
 *
 * Set per image rather than per section, because it is a property of the
 * photograph, not of where it happens to be shown.
 */
export type Focus = "top" | "center" | "bottom";

/**
 * CSS `object-position` for a focus value. The keywords already imply
 * horizontal centring, which is what we want in every case so far — if a photo
 * ever needs a horizontal nudge, widen this type rather than hardcoding a
 * position at the call site.
 */
export function focusPosition(focus: Focus | undefined): string {
  return focus ?? "center";
}

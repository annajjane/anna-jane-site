/**
 * Single source of truth for intro scroll (0–1 progress).
 * 1) Clouds + name — 2) name fades — 3) more scroll, clouds only —
 * 4) painting placeholder fades in while sky stack fades out.
 */
export const INTRO = {
  /** Matches CloudHero title fade (name gone by ~this progress) */
  titleFadeEnd: 0.28,
  /** Painting invisible before this; only clouds visible */
  paintRevealStart: 0.44,
  /** Painting fully in; sky stack nearly gone */
  paintRevealEnd: 0.86,
} as const;

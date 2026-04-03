"use client";

/**
 * Sticky viewport: painting + blocker + CloudHero.
 * `paintingRevealed` latches once progress passes paintRevealEnd so bounce/jitter
 * cannot bring clouds back; clears only when progress < paintRevealStart (scroll up).
 */
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useLayoutEffect } from "react";
import { CloudHero } from "@/components/CloudHero";
import { INTRO } from "@/components/introScrollPhases";
import { useScrollStage } from "@/components/ScrollStage";

const PAINTING_SRC = "/painting-placeholder.jpg";

export function IntroViewport() {
  const { progress } = useScrollStage();
  /** 1 = user has reached full painting; stays until they scroll back above paintRevealStart */
  const paintingRevealed = useMotionValue(0);

  useLayoutEffect(() => {
    const p = progress.get();
    if (p >= INTRO.paintRevealEnd) paintingRevealed.set(1);
    else if (p < INTRO.paintRevealStart) paintingRevealed.set(0);
  }, [progress, paintingRevealed]);

  useMotionValueEvent(progress, "change", (p) => {
    if (p >= INTRO.paintRevealEnd) paintingRevealed.set(1);
    else if (p < INTRO.paintRevealStart) paintingRevealed.set(0);
  });

  const heroStackOpacity = useTransform(
    [progress, paintingRevealed],
    (input: number[]) => {
      const p = input[0] ?? 0;
      const r = input[1] ?? 0;
      if (r === 1) return 0;
      if (p < INTRO.paintRevealStart) return 1;
      if (p >= INTRO.paintRevealEnd) return 0;
      return (
        1 -
        (p - INTRO.paintRevealStart) /
          (INTRO.paintRevealEnd - INTRO.paintRevealStart)
      );
    },
  );

  const paintOpacity = useTransform(
    [progress, paintingRevealed],
    (input: number[]) => {
      const p = input[0] ?? 0;
      const r = input[1] ?? 0;
      if (r === 1) return 1;
      if (p < INTRO.paintRevealStart) return 0;
      if (p >= INTRO.paintRevealEnd) return 1;
      return (
        (p - INTRO.paintRevealStart) /
        (INTRO.paintRevealEnd - INTRO.paintRevealStart)
      );
    },
  );

  const paintScale = useTransform(
    [progress, paintingRevealed],
    (input: number[]) => {
      const p = input[0] ?? 0;
      const r = input[1] ?? 0;
      if (r === 1) return 1;
      if (p < INTRO.paintRevealStart) return 1.05;
      if (p >= INTRO.paintRevealEnd) return 1;
      const t =
        (p - INTRO.paintRevealStart) /
        (INTRO.paintRevealEnd - INTRO.paintRevealStart);
      return 1.05 + t * (1 - 1.05);
    },
  );

  const blockerOpacity = useTransform(
    [progress, paintingRevealed],
    (input: number[]) => {
      const p = input[0] ?? 0;
      const r = input[1] ?? 0;
      if (r === 1) return 0;
      if (p < INTRO.paintRevealStart) return 1;
      if (p >= INTRO.paintRevealEnd) return 0;
      return (
        1 -
        (p - INTRO.paintRevealStart) /
          (INTRO.paintRevealEnd - INTRO.paintRevealStart)
      );
    },
  );

  return (
    <div className="sticky top-0 isolate h-dvh w-full overflow-hidden bg-[#1e3344]">
      <motion.div
        className="absolute inset-0 z-0 origin-center will-change-transform"
        style={{ opacity: paintOpacity, scale: paintScale }}
      >
        <Image
          src={PAINTING_SRC}
          alt=""
          fill
          loading="lazy"
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#1e3344]"
        style={{ opacity: blockerOpacity }}
        aria-hidden
      />

      <CloudHero heroStackOpacity={heroStackOpacity} />
    </div>
  );
}

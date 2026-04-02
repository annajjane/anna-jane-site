"use client";

/**
 * Stacks the intro (CloudHero) over Painting 1 in the same pinned viewport.
 * Clip-path on the wrapper reveals the lower scene as ScrollStage progress advances.
 */
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { CloudHero } from "@/components/CloudHero";
import { useScrollStage } from "@/components/ScrollStage";

/** Progress range over which the hero unclips from the bottom (tune with title fade). */
const REVEAL_END = 0.38;
/** Max % of hero height clipped from the bottom at REVEAL_END (shows Painting 1). */
const MAX_BOTTOM_INSET_PCT = 48;

export function IntroStack() {
  const { progress } = useScrollStage();

  const bottomInsetPct = useTransform(progress, (p) => {
    const t = Math.min(1, p / REVEAL_END);
    return t * MAX_BOTTOM_INSET_PCT;
  });

  const clipPath = useMotionTemplate`inset(0 0 ${bottomInsetPct}% 0)`;

  return (
    <div className="sticky top-0 isolate h-dvh w-full">
      {/* Painting 1 — structural placeholder; same pin as intro */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center bg-[#1e3344]"
        aria-hidden
      >
        <div className="flex h-[min(68vh,520px)] w-[min(88vw,640px)] items-center justify-center rounded-sm border border-white/15 bg-[#2a3540]/80">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/35">
            Painting 1
          </span>
        </div>
      </div>

      {/* CloudHero — unchanged; wrapper only clips reveal from bottom */}
      <motion.div
        className="relative z-10 min-h-dvh w-full"
        style={{ clipPath }}
      >
        <CloudHero />
      </motion.div>
    </div>
  );
}

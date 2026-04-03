"use client";

/**
 * Cinematic entry: full painted sky + matte overlays.
 * Title fades with ScrollStage progress; sky stack opacity can be driven by parent (reveal latch).
 */
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { INTRO } from "@/components/introScrollPhases";
import { useScrollStage } from "@/components/ScrollStage";

type CloudHeroProps = {
  /** When set (IntroViewport), respects reveal latch; otherwise derives from progress only. */
  heroStackOpacity?: MotionValue<number>;
};

export function CloudHero({ heroStackOpacity: heroStackOpacityProp }: CloudHeroProps) {
  const { progress } = useScrollStage();
  const titleOpacity = useTransform(
    progress,
    (p) => Math.max(0, 1 - p / INTRO.titleFadeEnd),
  );

  const heroStackOpacityFallback = useTransform(
    progress,
    [0, INTRO.paintRevealStart, INTRO.paintRevealEnd, 1],
    [1, 1, 0, 0],
    { clamp: true },
  );

  const heroStackOpacity = heroStackOpacityProp ?? heroStackOpacityFallback;

  return (
    <section
      className="cloud-hero relative z-10 flex min-h-dvh w-full items-center justify-center overflow-hidden bg-transparent isolate max-md:items-end max-md:pb-[min(28vh,240px)] md:pb-0"
      aria-label="ANNAJJANE"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: heroStackOpacity }}
        aria-hidden
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full overflow-hidden h-dvh max-md:h-[calc(100dvh+12vh)] max-md:-translate-y-[7vh] md:translate-y-0"
        >
          <Image
            src="/cloud-bg.png?v=3"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[94%_52%] md:object-[50%_44%] [transform:translateZ(0)] contrast-[1.09] saturate-[1.07] brightness-[0.995]"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-[0.42]"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 100% 95% at 0% 42%, rgba(252, 253, 255, 0.2) 0%, transparent 52%)",
              "radial-gradient(ellipse 95% 85% at 32% 58%, rgba(245, 249, 252, 0.16) 0%, transparent 55%)",
              "radial-gradient(ellipse 130% 80% at 50% 100%, rgba(232, 240, 248, 0.14) 0%, transparent 48%)",
            ].join(", "),
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[#e8eff3]/14"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-[#dfe9ee]/11 mix-blend-soft-light"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[4] mix-blend-soft-light"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 130% 90% at 35% 12%, rgba(255,255,255,0.26) 0%, transparent 52%)",
              "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 38%, rgba(18, 38, 58, 0.26) 100%)",
            ].join(", "),
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_120px_rgba(8,22,38,0.34)]"
        />
      </motion.div>

      <motion.h1
        className="cloud-hero__title relative z-10 px-6 text-center text-[clamp(2.25rem,7.5vw,4.25rem)] font-medium tracking-[0.24em] text-[#f7f4ef]"
        style={{ opacity: titleOpacity }}
      >
        ANNAJJANE
      </motion.h1>
    </section>
  );
}

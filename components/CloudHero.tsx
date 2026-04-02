"use client";

/**
 * Cinematic entry sky (README): soft painted cloud plate + matte overlays.
 * Title fades with ScrollStage progress (“ANNAJJANE” fades as user scrolls forward).
 */
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useScrollStage } from "@/components/ScrollStage";

/** Title fully faded by this fraction of stage progress (~0.25–0.3). */
const TITLE_FADE_END = 0.28;

export function CloudHero() {
  const { progress } = useScrollStage();
  const titleOpacity = useTransform(
    progress,
    (p) => Math.max(0, 1 - p / TITLE_FADE_END),
  );

  return (
    <section
      className="cloud-hero sticky top-0 z-10 flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#1e3344] isolate max-md:items-end max-md:pb-[min(28vh,240px)] md:pb-0"
      aria-label="ANNAJJANE"
    >
      {/* 1. Background — Next/Image for cleaner scaling than CSS bg; GPU layer for crisp compositing */}
      {/* Mobile: taller layer + translate up pans the crop so lower sky / clip-adjacent tone sits behind the title */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full overflow-hidden h-dvh max-md:h-[calc(100dvh+12vh)] max-md:-translate-y-[7vh] md:translate-y-0"
        aria-hidden
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

      {/* 2. Regional lift — slightly “solid” midtones away from the already-strong upper-right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-[0.42]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 100% 95% at 0% 42%, rgba(252, 253, 255, 0.2) 0%, transparent 52%)",
            "radial-gradient(ellipse 95% 85% at 32% 58%, rgba(245, 249, 252, 0.16) 0%, transparent 55%)",
            "radial-gradient(ellipse 130% 80% at 50% 100%, rgba(232, 240, 248, 0.14) 0%, transparent 48%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/* 3. Softening — lighter wash so pigment reads more solid overall */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[#e8eff3]/14"
        aria-hidden
      />

      {/* 4. Tone — matte painted feel */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-[#dfe9ee]/11 mix-blend-soft-light"
        aria-hidden
      />

      {/* 5. Depth — volume; soft-light keeps edges clean */}
      <div
        className="pointer-events-none absolute inset-0 z-[4] mix-blend-soft-light"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 130% 90% at 35% 12%, rgba(255,255,255,0.26) 0%, transparent 52%)",
            "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 38%, rgba(18, 38, 58, 0.26) 100%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/* 6. Edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_120px_rgba(8,22,38,0.34)]"
        aria-hidden
      />

      <motion.h1
        className="cloud-hero__title relative z-10 px-6 text-center text-[clamp(2.25rem,7.5vw,4.25rem)] font-medium tracking-[0.24em] text-[#f7f4ef]"
        style={{ opacity: titleOpacity }}
      >
        ANNAJJANE
      </motion.h1>
    </section>
  );
}

"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useScroll, type MotionValue } from "framer-motion";

export type ScrollStageContextValue = {
  /** Scroll progress through the stage track, 0 → 1 (Framer Motion `scrollYProgress`). */
  progress: MotionValue<number>;
};

const ScrollStageContext = createContext<ScrollStageContextValue | null>(null);

export function useScrollStage(): ScrollStageContextValue {
  const ctx = useContext(ScrollStageContext);
  if (!ctx) {
    throw new Error("useScrollStage must be used within <ScrollStage>");
  }
  return ctx;
}

type ScrollStageProps = {
  children: ReactNode;
  /**
   * Tailwind height class for the scroll track (must exceed viewport so progress can move).
   * Default leaves room below the hero for the cinematic scroll phase.
   */
  trackClassName?: string;
};

export function ScrollStage({
  children,
  trackClassName = "min-h-[400vh]",
}: ScrollStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollStageContext.Provider value={{ progress: scrollYProgress }}>
      <div ref={ref} className={`relative ${trackClassName}`}>
        {children}
      </div>
    </ScrollStageContext.Provider>
  );
}

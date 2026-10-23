"use client";

/**
 * Custom cursor — fine-pointer (desktop-class) devices only, at ANY viewport
 * width, so a desktop user resizing the window or using DevTools mobile
 * emulation always sees a visible cursor. Real touch devices never activate it.
 *
 * No magnetic pull: the dot sits exactly at the pointer position. Smoothness
 * comes from a crisp high-stiffness spring on the dot and a gently trailing
 * ring that grows over interactive elements (links, buttons).
 */
import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

const DOT = { width: 8, height: 8 };
const RING = { width: 38, height: 38 };

export default function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  // Dot: near-instant so it always sits under the exact pointer position,
  // but still spring-smoothed so movement feels fluid, not jittery.
  const dotX = useSpring(pointerX, { stiffness: 1500, damping: 45, mass: 0.4 });
  const dotY = useSpring(pointerY, { stiffness: 1500, damping: 45, mass: 0.4 });

  // Ring: softer spring — trails just behind the dot for an elegant feel.
  const ringX = useSpring(pointerX, { stiffness: 220, damping: 26, mass: 0.5 });
  const ringY = useSpring(pointerY, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    // Grow the ring over any interactive element (native hover detection —
    // no position snapping involved).
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest?.("a, button, input, textarea, [role='button']"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: RING.width,
          height: RING.height,
          marginLeft: -RING.width / 2,
          marginTop: -RING.height / 2,
        }}
      >
        <motion.div
          className="rounded-full border border-ink/60"
          animate={{
            width: hovering ? 46 : 30,
            height: hovering ? 46 : 30,
            opacity: hovering ? 0.9 : 0.45,
            borderColor: hovering ? "#E8503A" : "rgba(130, 124, 116, 0.55)",
            backgroundColor: hovering
              ? "rgba(232, 80, 58, 0.08)"
              : "rgba(232, 80, 58, 0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      </motion.div>

      {/* Exact-position dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71]"
        style={{
          x: dotX,
          y: dotY,
          width: DOT.width,
          height: DOT.height,
          marginLeft: -DOT.width / 2,
          marginTop: -DOT.height / 2,
        }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-vermilion"
          animate={{ scale: hovering ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      </motion.div>
    </>
  );
}

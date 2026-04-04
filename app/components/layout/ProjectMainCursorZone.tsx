"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  CURSOR_PROJECT_MAIN_EVENT,
  type CursorProjectMainDetail,
} from "@/app/lib/cursor-events";

type ProjectMainCursorZoneProps = {
  children: ReactNode;
  /**
   * When the top of this block scrolls above this distance from the viewport top,
   * the custom cursor dot is hidden (you’re in the “lower” case-study body).
   * Larger value → hides sooner while scrolling. Decrease if it hides too early;
   * increase if it feels late.
   */
  hideThresholdPx?: number;
};

function emit(detail: CursorProjectMainDetail) {
  window.dispatchEvent(
    new CustomEvent<CursorProjectMainDetail>(CURSOR_PROJECT_MAIN_EVENT, {
      detail,
    }),
  );
}

/**
 * Wrap the main content column below the project hero so the custom cursor
 * can hide while the user reads the lower sections.
 */
export default function ProjectMainCursorZone({
  children,
  hideThresholdPx = 96,
}: ProjectMainCursorZoneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = el.getBoundingClientRect().top;
      const hideDot = top < hideThresholdPx;
      emit({ hideDot });
    };

    update();
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
      emit({ hideDot: false });
    };
  }, [hideThresholdPx]);

  return <div ref={ref}>{children}</div>;
}

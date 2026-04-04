/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  CURSOR_PROJECT_MAIN_EVENT,
  type CursorProjectMainDetail,
} from "@/app/lib/cursor-events";

export type CursorMode = "dot" | "caseStudy";

type CursorContextValue = (mode: CursorMode) => void;

const CursorContext = createContext<CursorContextValue | null>(null);

const noopCursor: CursorContextValue = () => {};

const LERP = 0.22;

export function useSetCursorMode(): CursorContextValue {
  const ctx = useContext(CursorContext);
  return ctx ?? noopCursor;
}

export default function CursorProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  const [finePointer, setFinePointer] = useState(false);
  const [mode, setMode] = useState<CursorMode>("dot");
  const [visible, setVisible] = useState(false);
  /** On /projects/*, hide custom dot while scrolled into the main body (see ProjectMainCursorZone). */
  const [hideDotInProjectMain, setHideDotInProjectMain] = useState(false);

  const layerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const movedRef = useRef(false);

  useLayoutEffect(() => {
    setFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const setModeStable = useCallback(
    (m: CursorMode) => {
      if (m === "caseStudy" && isProjectPage) return;
      setMode(m);
    },
    [isProjectPage],
  );

  useEffect(() => {
    if (isProjectPage) {
      setMode("dot");
    } else {
      setHideDotInProjectMain(false);
    }
  }, [isProjectPage]);

  useEffect(() => {
    const onProjectMain = (e: Event) => {
      const ce = e as CustomEvent<CursorProjectMainDetail>;
      setHideDotInProjectMain(Boolean(ce.detail?.hideDot));
    };
    window.addEventListener(CURSOR_PROJECT_MAIN_EVENT, onProjectMain);
    return () => window.removeEventListener(CURSOR_PROJECT_MAIN_EVENT, onProjectMain);
  }, []);

  /* Hide the real cursor only while the “View case study” pill is showing */
  useEffect(() => {
    if (!finePointer) return;
    const root = document.documentElement;
    const cls = "custom-cursor-case-study";
    if (mode === "caseStudy") {
      root.classList.add(cls);
    } else {
      root.classList.remove(cls);
    }
    return () => root.classList.remove(cls);
  }, [mode, finePointer]);

  useEffect(() => {
    if (!finePointer) {
      movedRef.current = false;
      setVisible(false);
      return;
    }

    let alive = true;

    const tick = () => {
      if (!alive) return;
      const el = layerRef.current;
      if (el && movedRef.current) {
        const target = mouseRef.current;
        const pos = posRef.current;
        pos.x += (target.x - pos.x) * LERP;
        pos.y += (target.y - pos.y) * LERP;
        el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!movedRef.current) {
        movedRef.current = true;
        posRef.current = { x: e.clientX, y: e.clientY };
        if (layerRef.current) {
          layerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        }
        setVisible(true);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      alive = false;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      movedRef.current = false;
      setVisible(false);
    };
  }, [finePointer]);

  const showCursorOverlay =
    finePointer && !(isProjectPage && hideDotInProjectMain);

  return (
    <CursorContext.Provider value={setModeStable}>
      {children}
      {showCursorOverlay ? (
        <div
          ref={layerRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-[10050] will-change-transform ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
        >
          {mode === "dot" ? (
            <div className="h-7 w-7 shrink-0 rounded-full bg-brand-paper shadow-md ring-2 ring-black/25" />
          ) : (
            <div className="flex items-center gap-2 rounded-full  bg-brand-paper px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-ink shadow-lg sm:px-5 sm:text-xs">
              <span className="whitespace-nowrap">View case study</span>
              <ArrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </div>
          )}
        </div>
      ) : null}
    </CursorContext.Provider>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

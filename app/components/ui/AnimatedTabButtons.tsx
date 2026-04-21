
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type AnimatedTabButtonsProps = {
  className?: string;
};

export default function AnimatedTabButtons({ className = "" }: AnimatedTabButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [pendingPath, setPendingPath] = useState<"/home" | "/about" | null>(null);
  const [hoveredTab, setHoveredTab] = useState<"/home" | "/about" | null>(null); // NEW

  const activePath: "/home" | "/about" =
    pendingPath ?? (pathname.startsWith("/about") ? "/about" : "/home");
  const baseAngleDeg = activePath === "/about" ? 180 : 0;

  const isAboutActive = activePath === "/about";
  const isPortfolioActive = activePath === "/home";

  const radiusPx = 37;
  const animationMs = 500;
  const activeScale = 1.16;

  // UPDATED: added isHovered parameter
  const orbitTransform = (angleDeg: number, isActive: boolean, isHovered: boolean) => {
  const scale = isActive ? activeScale : isHovered ? 1.08 : 1;
  const yOffset = isActive ? 0 : 37; // px — adjust this value to taste
  return `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radiusPx}px) rotate(${-angleDeg}deg) scale(${scale}) translateY(${yOffset}px)`;
};

  const tabBase =
    "h-16 w-16 sm:h-20 sm:w-20 cursor-pointer rounded-full flex items-center justify-center text-center button-styles  select-none";
  const tabInactive =
"";
    const tabActive =
    "";

  return (
    <nav aria-label="Primary" className={`relative ${className}`}>
      <div
        className="relative h-20 sm:h-24 sm:w-44 cursor-pointer z-10"
        onClick={() => {
          const targetPath = activePath === "/home" ? "/about" : "/home";
          setPendingPath(targetPath);
          router.push(targetPath);
          window.setTimeout(() => setPendingPath(null), animationMs);
        }}
      >
        <Link
          href="/home"
          aria-current={isPortfolioActive ? "page" : undefined}
          onMouseEnter={() => setHoveredTab("/home")}   // NEW
          onMouseLeave={() => setHoveredTab(null)}       // NEW
          className={[
            tabBase,
            isPortfolioActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isPortfolioActive ? "z-30" : "z-10",
          ].join(" ")}
          style={{ transform: orbitTransform(baseAngleDeg, isPortfolioActive, hoveredTab === "/home") }} // UPDATED
        >
          Portfolio
        </Link>

        <Link
          href="/about"
          aria-current={isAboutActive ? "page" : undefined}
          onMouseEnter={() => setHoveredTab("/about")}  // NEW
          onMouseLeave={() => setHoveredTab(null)}       // NEW
          className={[
            tabBase,
            isAboutActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isAboutActive ? "z-30" : "z-10",
          ].join(" ")}
          style={{ transform: orbitTransform(baseAngleDeg + 180, isAboutActive, hoveredTab === "/about") }} // UPDATED
        >
          About
          <br />
          Me
        </Link>
      </div>
    </nav>
  );
}
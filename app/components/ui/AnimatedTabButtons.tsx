
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type AnimatedTabButtonsProps = {
  className?: string;
};

export default function AnimatedTabButtons({ className = "" }: AnimatedTabButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [pendingPath, setPendingPath] = useState<"/home" | "/about" | null>(null);

  const activePath: "/home" | "/about" =
    pendingPath ?? (pathname.startsWith("/about") ? "/about" : "/home");
  const baseAngleDeg = activePath === "/about" ? 180 : 0;

  const isAboutActive = activePath === "/about";
  const isPortfolioActive = activePath === "/home";

  const radiusPx = 44;
  const animationMs = 700;
  const activeScale = 1.16;

  const orbitTransform = (angleDeg: number, isActive: boolean) =>
    `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radiusPx}px) rotate(${-angleDeg}deg) scale(${isActive ? activeScale : 1})`;

  const tabBase =
    "h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-gray-300 flex items-center justify-center text-decoration-none text-center text-xs sm:text-sm font-semibold leading-tight select-none";
  const tabInactive = "bg-white text-gray-900 hover:bg-gray-50";
  const tabActive = "bg-gray-900 text-white shadow-lg";

  const handleTabClick = (event: MouseEvent<HTMLAnchorElement>, targetPath: "/home" | "/about") => {
    if (activePath === targetPath) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setPendingPath(targetPath);
    router.push(targetPath);

    window.setTimeout(() => {
      setPendingPath(null);
    }, animationMs);
  };

  return (
    <nav aria-label="Primary" className={`relative ${className}`}>
      <div className="relative h-20 w-44 sm:h-24 sm:w-56">
        <Link
          href="/home"
          aria-current={isPortfolioActive ? "page" : undefined}
          onClick={(event) => handleTabClick(event, "/home")}
          className={[
            tabBase,
            isPortfolioActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isPortfolioActive ? "z-30" : "z-10",
            pendingPath ? "pointer-events-none" : "",
          ].join(" ")}
          style={{ transform: orbitTransform(baseAngleDeg, isPortfolioActive) }}
        >
          Portfolio
        </Link>

        <Link
          href="/about"
          aria-current={isAboutActive ? "page" : undefined}
          onClick={(event) => handleTabClick(event, "/about")}
          className={[
            tabBase,
            isAboutActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isAboutActive ? "z-30" : "z-10",
            pendingPath ? "pointer-events-none" : "",
          ].join(" ")}
          style={{ transform: orbitTransform(baseAngleDeg + 180, isAboutActive) }}
        >
          About
          <br />
          Me
        </Link>
      </div>
    </nav>
  );
}
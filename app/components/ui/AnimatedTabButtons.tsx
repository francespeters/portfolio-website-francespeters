
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

  const radiusPx = 40;
  const animationMs = 500;
  const activeScale = 1.16;

  const orbitTransform = (angleDeg: number, isActive: boolean) =>
    `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radiusPx}px) rotate(${-angleDeg}deg) scale(${isActive ? activeScale : 1})`;

  const tabBase =
    "h-16 w-16 sm:h-20 sm:w-20 cursor-pointer rounded-full flex items-center justify-center text-center text-xs font-semibold leading-tight no-underline select-none sm:text-sm";
  const tabInactive =
    " bg-brand-surface !text-brand-paper transition-colors hover:border-white/30 hover:bg-brand-ink hover:!text-brand-paper translate-y-4";
  const tabActive =
    "border border-white/20 bg-brand-paper !text-brand-ink shadow-lg";

  // const handleTabClick = (event: MouseEvent<HTMLAnchorElement>, targetPath: "/home" | "/about") => {
  //   event.stopPropagation(); // add this
  //   if (activePath === targetPath) {
  //     event.preventDefault();
  //     return;
  //   }

  //   event.preventDefault();
  //   setPendingPath(targetPath);
  //   router.push(targetPath);

  //   window.setTimeout(() => {
  //     setPendingPath(null);
  //   }, animationMs);
  // };

  return (
    <nav aria-label="Primary" className={`relative ${className}`}>
      <div className="relative h-20 sm:h-24 sm:w-44 cursor-pointer z-10"
      onClick={() => {
    const targetPath = activePath === "/home" ? "/about" : "/home";
    setPendingPath(targetPath);
    router.push(targetPath);
    window.setTimeout(() => setPendingPath(null), animationMs);
  }}>
        <Link
          href="/home"
          aria-current={isPortfolioActive ? "page" : undefined}
          className={[
            tabBase,
            isPortfolioActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isPortfolioActive ? "z-30" : "z-10",
            
          ].join(" ")}
          style={{ transform: orbitTransform(baseAngleDeg, isPortfolioActive) }}
        >
          Portfolio
        </Link>

        <Link
          href="/about"
          aria-current={isAboutActive ? "page" : undefined}
          className={[
            tabBase,
            isAboutActive ? tabActive : tabInactive,
            "absolute left-1/2 top-1/2 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isAboutActive ? "z-30" : "z-10",
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
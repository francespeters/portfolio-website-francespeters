"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CLASS_NAME = "project-route";

/** White/light page shell on /projects/* (overrides dark body vars). */
export default function ProjectRouteBodyClass() {
  const pathname = usePathname();
  const isProject = pathname.startsWith("/projects/");

  useEffect(() => {
    document.documentElement.classList.toggle(CLASS_NAME, isProject);
    return () => {
      document.documentElement.classList.remove(CLASS_NAME);
    };
  }, [isProject]);

  return null;
}

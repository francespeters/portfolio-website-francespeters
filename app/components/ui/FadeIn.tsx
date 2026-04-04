"use client";

import { useInView } from "@/app/hooks/useInView";

export default function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${inView ? "fadeInUp-animation" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}
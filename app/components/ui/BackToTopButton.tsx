
"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 4000);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-9 right-8 z-50 mt-10 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-700 transition-colors"
    >
      ↑
    </button>
  );
}
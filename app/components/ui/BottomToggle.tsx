"use client";

import { useEffect, useState } from "react";

type View = "Case Studies" | "Gallery";

interface BottomToggleProps {
  active: View;
  onChange: (view: View) => void;
}

const GalleryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="0" y="0" width="6" height="14" rx="1.5" fill="currentColor" />
    <rect x="8" y="0" width="6" height="14" rx="1.5" fill="currentColor" />
  </svg>
);

const CaseStudiesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="0" y="0"  width="14" height="2.5" rx="1.25" fill="currentColor" />
    <rect x="0" y="5.75" width="14" height="2.5" rx="1.25" fill="currentColor" />
    <rect x="0" y="11.5" width="14" height="2.5" rx="1.25" fill="currentColor" />
  </svg>
);

const icons: Record<View, React.ReactNode> = {
  Gallery: <GalleryIcon />,
  "Case Studies": <CaseStudiesIcon />,
};

export default function BottomToggle({ active, onChange }: BottomToggleProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 40;
      setVisible(!nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        gap: "8px",
        padding: "20px",
        margin: "-20px",
        borderRadius: "100px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
        cursor: "default",
      }}
    >
      {(["Case Studies", "Gallery"] as View[]).map((view) => (
        <button
          key={view}
          onClick={() => onChange(view)}
          style={{
            borderRadius: "100px",
            padding: "10px 24px",
            border: "none",
            cursor: "pointer",
            fontFamily: "Labil Grotesk, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "#ffffff",
            background:
              active === view
                ? "rgba(0, 0, 0, 0.65)"
                : "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 0.25s ease",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {icons[view]}
          {view}
        </button>
      ))}
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export type GalleryItem = {
  id: string;
  src: string;
  alt?: string;
  title: string;
  process: string;
  tags?: string[];
  type?: "image" | "video"; // ← add this, defaults to image
  maxHeight?: number;
};

interface GalleryProps {
  items: GalleryItem[];
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const media = item.type === "video" ? (
    <video
      src={item.src}
      className="w-full block"
      autoPlay
      muted
      loop
      playsInline
      style={{
        transform: hovered ? "scale(1.04)" : "scale(1)",
        filter: hovered ? "blur(3px) brightness(0.45)" : "blur(0px) brightness(1)",
        transition: "filter 0.4s ease, transform 0.5s ease",
      }}
    />
  ) : (
    <img
      src={item.src}
      alt={item.alt ?? item.title}
      className="w-full block"
      style={{
        transform: hovered ? "scale(1.04)" : "scale(1)",
        filter: hovered ? "blur(3px) brightness(0.45)" : "blur(0px) brightness(1)",
        transition: "filter 0.4s ease, transform 0.5s ease",
      }}
    />
  );

  return (
    <div
      className="relative rounded-lg cursor-pointer overflow-hidden fadeInUp-animation"
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {media}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.tags.map((tag) => (
              <span key={tag} style={{ fontFamily: "Labil Grotesk, sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 style={{ fontFamily: "Labil Grotesk, sans-serif", fontSize: "18px", fontWeight: 600, color: "#ffffff", margin: "0 0 6px 0", lineHeight: 1.2 }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: "Labil Grotesk, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.process}
        </p>
      </div>
    </div>
  );
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            breakInside: "avoid",
            marginBottom: "12px",
            display: "inline-block",
            width: "100%",
          }}
        >
          <GalleryCard item={item} index={i} />
        </div>
      ))}
    </div>
  );
}

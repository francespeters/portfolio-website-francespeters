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
  maxHeight?: number | string;
  align?: "left" | "center" | "right";
};

interface GalleryProps {
  items: GalleryItem[];
}


function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const maxHeightValue = item.maxHeight
    ? typeof item.maxHeight === "number"
      ? item.maxHeight
      : `${item.maxHeight}px`
    : undefined;

  const mediaStyle = {
    transform: hovered ? "scale(1.04)" : "scale(1)",
    filter: hovered ? "blur(3px) brightness(0.45)" : "blur(0px) brightness(1)",
    transition: "filter 0.4s ease, transform 0.5s ease",
    ...(maxHeightValue && {
      maxHeight: maxHeightValue,
      width: "auto",
      maxWidth: "100%",
    }),
  };

  const media =
    item.type === "video" ? (
      <video
        src={item.src}
        className={maxHeightValue ? "block" : "w-full block"}
        autoPlay
        muted
        loop
        playsInline
        style={mediaStyle}
      />
    ) : (
      <img
        src={item.src}
        alt={item.alt ?? item.title}
        className={maxHeightValue ? "block" : "w-full block"}
        style={mediaStyle}
      />
    );

  const alignMap = { left: "justify-start", center: "justify-center", right: "justify-end" };

  return (
    <div className={`flex ${alignMap[item.align ?? "left"]}`}>
      <div
        className="relative rounded-lg cursor-pointer overflow-hidden fadeInUp-animation w-fit"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        {media}

        {/* Overlay — only when hovered */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
              : "transparent",
            transition: "background 0.4s ease",
          }}
        />

        {/* Info text */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
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

        {/* Glass + button */}
        <button
          className="absolute top-3 right-3"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)",
            background: "rgba(0,0,0,0.35)",        // darker — use black instead of white

            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.2s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <span style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 300,
            userSelect: "none",
          }}>
            +
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-2 gap-2 ">
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

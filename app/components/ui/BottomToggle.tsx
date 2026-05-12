"use client";

type View = "Case Studies" | "Gallery";

interface BottomToggleProps {
  active: View;
  onChange: (view: View) => void;
}

export default function BottomToggle({ active, onChange }: BottomToggleProps) {
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
        padding: "6px",
        borderRadius: "100px",
        
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
            fontWeight: active === view ? 400 : 400,
            color: "#ffffff",
            background:
              active === view
                ? "rgba(0, 0, 0, 0.65)"
                : "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 0.25s ease",
            whiteSpace: "nowrap",
          }}
        >
          {view}
        </button>
      ))}
    </div>
  );
}
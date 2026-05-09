"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NewHeader = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <div className={`w-full ${isProjectPage ? "bg-brand-bg-primary" : "bg-brand-ink"}`}>
      <header className="mx-auto max-w-[1400px] px-6 py-4">
        <div className="flex w-full items-center justify-between">

          {/* Left — name or back button */}
          {isProjectPage ? (
            <Link
              href="/home"
              className="group flex items-center gap-2 no-underline"
              style={{ fontFamily: "Labil Grotesk", fontSize: "16px", fontWeight: 500, color: "#121212" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                }}
                className="group-hover:-translate-x-1"
              >
                ←
              </span>
              Back
            </Link>
          ) : (
            <Link
              href="/home"
              className="no-underline shrink-0"
              style={{ fontFamily: "Labil Grotesk", fontSize: "24px", fontWeight: 500, color: "#121212" }}
            >
              Frances Peters
            </Link>
          )}

          {/* Right — nav links */}
            <nav className="flex items-center gap-8">
                <Link
                    href="/home"
                    className="no-underline transition-transform duration-200 hover:scale-110 inline-block"
                    style={{
                    fontFamily: "Labil Grotesk",
                    fontSize: "24px",
                    fontWeight: pathname === "/home" ? 500 : 400,
                    color: "#121212",
                    }}
                >
                    Work
                </Link>
                <Link
                    href="/about"
                    className="no-underline transition-transform duration-200 hover:scale-110 inline-block"
                    style={{
                    fontFamily: "Labil Grotesk",
                    fontSize: "24px",
                    fontWeight: pathname === "/about" ? 500 : 400,
                    color: "#121212",
                    }}
                >
                    About
                </Link>
                </nav>

                        </div>
                    </header>
    </div>
  );
};

export default NewHeader;
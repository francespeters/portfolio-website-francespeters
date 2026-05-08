"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSetCursorMode } from "../providers/CursorProvider";
import ItemTag from "../ui/ItemTag";
import Projects from "../../database/projects.json";
import { useInView } from "@/app/hooks/useInView";

type FilterTag = "All Work" | "UX Design" | "Graphic Design" | "Branding & Marketing" | "Animation";

const FILTER_TAGS: FilterTag[] = [
  "All Work",
  "UX Design",
  "Graphic Design",
  "Branding & Marketing",
  "Animation",
];

export type PortfolioProject = (typeof Projects)[number];

function PortfolioItem({ project }: { project: PortfolioProject }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  const setCursorMode = useSetCursorMode();

  const imageAlt =
    "imageAlt" in project && typeof project.imageAlt === "string"
      ? project.imageAlt
      : project.title;

  return (
    <li
      ref={ref}
      className={`mb-4 break-inside-avoid ${inView ? "fadeInUp-animation" : "opacity-0"}`}
      onMouseEnter={() => setCursorMode("caseStudy")}
      onMouseLeave={() => setCursorMode("dot")}
    >
      <Link
        href={project.href}
        className="group block overflow-hidden border-neutral-200 bg-brand-bg-primary text-inherit shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
      >
        <div
          className={`relative w-full ${
            "aspect" in project && project.aspect ? project.aspect : "aspect-[4/3]"
          }`}
        >
          {"imageSrc" in project && project.imageSrc ? (
            String(project.imageSrc).startsWith("/") ? (
              <Image
                src={project.imageSrc as string}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageSrc as string}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {project.title}
            </div>
          )}
        </div>
      </Link>
      <footer className="px-2 pt-3 dark:border-neutral-800">
        <ItemTag text={project.title} date={project.date} tags={project.tags} />
      </footer>
    </li>
  );
}

export default function PortfolioGrid({
  projects = Projects as PortfolioProject[],
  className = "",
}: {
  projects?: PortfolioProject[];
  className?: string;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All Work");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);

  // Update indicator position whenever activeFilter changes
  useEffect(() => {
    const idx = FILTER_TAGS.indexOf(activeFilter);
    const btn = buttonRefs.current[idx];
    const bar = barRef.current;
    if (!btn || !bar) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setIndicatorStyle({
      left: btnRect.left - barRect.left,
      width: btnRect.width,
    });
  }, [activeFilter]);

  const filteredProjects =
    activeFilter === "All Work"
      ? projects
      : projects.filter(
          (p) => Array.isArray(p.tags) && p.tags.includes(activeFilter)
        );

  

  return (
    <div>
      {/* Filter Bar */}
  <div ref={barRef} className="relative mb-8 flex flex-wrap gap-8 border-b border-[#e0e0e0]">
    {FILTER_TAGS.map((tag, i) => (
      <button
        key={tag}
        ref={(el) => { buttonRefs.current[i] = el; }}
        onClick={() => setActiveFilter(tag)}
        className="relative pb-3 cursor-pointer bg-transparent border-none p-0 transition-opacity duration-200 hover:opacity-50"
        style={{
          fontFamily: "Labil Grotesk",
          fontSize: "16px",
          fontWeight: activeFilter === tag ? 600 : 400,
          color: "#121212",
          marginBottom: "-1px",
        }}
      >
        {tag}
      </button>
    ))}

    {/* Single sliding indicator */}
    <span
      className="absolute bottom-0 h-[1.5px] bg-[#121212] rounded-sm"
      style={{
        left: indicatorStyle.left,
        width: indicatorStyle.width,
        transition: "left 0.25s ease, width 0.25s ease",
      }}
    />
  </div>

      {/* Grid */}
      <ul className={`columns-1 gap-4 p-0 sm:columns-2 ${className} list-none`}>
        {filteredProjects.map((project) => (
          <PortfolioItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}
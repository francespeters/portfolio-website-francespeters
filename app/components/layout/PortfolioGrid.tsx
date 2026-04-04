"use client";

import Image from "next/image";
import Link from "next/link";
import { useSetCursorMode } from "../providers/CursorProvider";
import ItemTag from "../ui/ItemTag";
import Projects from "../../database/projects.json";

export type PortfolioProject = (typeof Projects)[number];

type PortfolioGridProps = {
  projects?: PortfolioProject[];
  className?: string;
};

export default function PortfolioGrid({
  projects = Projects as PortfolioProject[],
  className = "",
}: PortfolioGridProps) {
  const setCursorMode = useSetCursorMode();

  return (
    <ul className={`columns-1 gap-4 p-0 sm:columns-2 ${className} list-none `}>
      {projects.map((project) => {
        const imageAlt =
          "imageAlt" in project && typeof project.imageAlt === "string"
            ? project.imageAlt
            : project.title;

        return (
        <li
          key={project.id}
          className="mb-4 break-inside-avoid"
          onMouseEnter={() => setCursorMode("caseStudy")}
          onMouseLeave={() => setCursorMode("dot")}
        >
          <Link
            href={project.href}
            className="group block overflow-hidden rounded-sm  border-neutral-200 bg-brand-surface text-inherit shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md "
          >
            <div
              className={`relative w-full ${"aspect" in project && project.aspect ? project.aspect : "aspect-[4/3]"}`}
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
          <footer className=" px-2 pt-3 dark:border-neutral-800">
              <ItemTag text={project.tagText} date={project.date} />
            </footer>
        </li>
        );
      })}
    </ul>
  );
}

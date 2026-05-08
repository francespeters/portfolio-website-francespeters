// app/components/ui/ProjectFilter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  cover?: string;
};

type Tag = "All Work" | "UX Design" | "Graphic Design" | "Branding & Marketing" | "Animation";

const TAGS: Tag[] = ["All Work", "UX Design", "Graphic Design", "Branding & Marketing", "Animation"];

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Tag>("All Work");

  const filtered =
    active === "All Work"
      ? projects
      : projects.filter((p) => p.type === active);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer
              ${
                active === tag
                  ? "bg-black text-white"
                  : "bg-transparent text-black border border-black hover:bg-black hover:text-white"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="group">
            {project.cover && (
              <div className="overflow-hidden rounded-lg mb-3">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <p className="text-xs text-gray-400 uppercase tracking-wide">{project.type}</p>
            <h3 className="font-medium text-lg">{project.title}</h3>
            {project.subtitle && (
              <p className="text-sm text-gray-500">{project.subtitle}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
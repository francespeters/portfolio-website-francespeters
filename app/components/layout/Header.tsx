"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedTabButtons from "../ui/AnimatedTabButtons";

const Header = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <div className={`w-full ${isProjectPage ? "bg-white" : "bg-black"}`}>
  <header className="mx-auto max-w-[1400px] px-6">
      <div className="flex w-full items-center justify-between pt-1">
        {isProjectPage ? (
          <Link
            href="/home"
            className="inline-flex items-center gap-2 rounded-full border border-black-300 w-20 h-20 px-4 py-4 mt-3 text-sm font-semibold text-white text-decoration-none bg-black transition-colors hover:bg-white hover:text-black "
          >
            Back
          </Link>
        ) : (
          <Link href="/home" className="text-xl font-600 text-white text-decoration-none">
            Frances Peters
          </Link>
        )}

        <div className="pt-3">
          {isProjectPage ? null : <AnimatedTabButtons />}
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;

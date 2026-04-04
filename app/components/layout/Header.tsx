"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedTabButtons from "../ui/AnimatedTabButtons";

const Header = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <div className="w-full bg-brand-ink">
      <header className="mx-auto max-w-[1400px] px-6">
        <div className="flex w-full items-center justify-between pt-1">
          {isProjectPage ? (
            <Link
              href="/home"
              className="mt-3 inline-flex h-20 w-20 items-center justify-center rounded-full text-sm font-semibold !text-brand-paper no-underline transition-colors "
            >
              Back
            </Link>
          ) : (
            <Link
              href="/home"
              className="text-xl font-semibold !text-brand-paper no-underline"
            >
              Frances Peters
            </Link>
          )}

          <div className="pt-3">
            <AnimatedTabButtons />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

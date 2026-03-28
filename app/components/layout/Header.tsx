"use client";

import AnimatedTabButtons from "../ui/AnimatedTabButtons";

const Header = () => {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        <a href="/home" className="text-xl font-bold text-gray-900">
          MyApp
        </a>

        <AnimatedTabButtons />
      </div>
    </header>
  );
};

export default Header;
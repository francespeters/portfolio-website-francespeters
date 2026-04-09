"use client";

import PortfolioGrid from "../components/layout/PortfolioGrid";
import RotatedTextBlock from "../components/ui/RotatedTextBlock";

function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <section aria-label="Homepage Past Work" className="mt-30 mb-80 m:mt-20 fadeInUp-animation" >
        <RotatedTextBlock
          text="Designer + Programmer motivated by creating meaningful digital experiences."
        />
      </section>

      <section aria-label="Portfolio" className="max-w-[1400px] px-6mb-10 fadeInUp-animation">
        <PortfolioGrid />
      </section>
    </div>
  );
}

export default Home;
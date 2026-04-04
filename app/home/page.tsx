"use client";

import PortfolioGrid from "../components/layout/PortfolioGrid";
import RotatedTextBlock from "../components/ui/RotatedTextBlock";

function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <section aria-label="Homepage Past Work" className="mb-80 mt-20 fadeInUp-animation" >
        <RotatedTextBlock
          text="Designer passionate about solving ambiguous problems through user-centered design and creative solutions."
        />
      </section>

      <section aria-label="Portfolio" className="max-w-[1400px] px-6mb-10 fadeInUp-animation">
        <PortfolioGrid />
      </section>
    </div>
  );
}

export default Home;
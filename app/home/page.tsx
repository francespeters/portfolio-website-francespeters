"use client";

import PortfolioGrid from "../components/layout/PortfolioGrid";
import RotatedTextBlock from "../components/ui/RotatedTextBlock";

function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <section aria-label="Homepage Past Work" className="mt-10 mb-10 m:mt-10 fadeInUp-animation" >
        <img src="/images/HomeText.png" alt="Collage of past work" className="w-[600px] rounded-lg" />
      </section>

      <section aria-label="Portfolio" className="max-w-[1400px] px-6mb-10 fadeInUp-animation">
        <PortfolioGrid />
      </section>
    </div>
  );
}

export default Home;
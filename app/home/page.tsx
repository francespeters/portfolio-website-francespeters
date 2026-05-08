"use client";

import { useState } from "react";
import PortfolioGrid from "../components/layout/PortfolioGrid";
import BottomToggle from "../components/ui/BottomToggle";
import Gallery from "../components/layout/Gallery";
import type { GalleryItem } from "../components/layout/Gallery";
import galleryData from "../database/gallery.json";

const gallery = galleryData as GalleryItem[];

function Home() {
  const [view, setView] = useState<"Case Studies" | "Gallery">("Case Studies");

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <section aria-label="Homepage Past Work" className="mt-10 mb-10 m:mt-10 fadeInUp-animation">
        <img src="/images/HomeText.png" alt="Collage of past work" className="w-[600px] rounded-lg" />
      </section>

      <section aria-label="Portfolio" className="max-w-[1400px] px-6 mb-10 fadeInUp-animation">
        {view === "Case Studies" ? <PortfolioGrid /> : <Gallery items={gallery} />}
      </section>

      <BottomToggle active={view} onChange={setView} />
    </div>
  );
}

export default Home;
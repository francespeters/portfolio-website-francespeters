"use client";

import { useState } from "react";
import "../components/ui/FilterHeading";
import ItemGrid from "../components/layout/ItemGrid";
import RotatedTextBlock from "../components/ui/RotatedTextBlock";

function Home() {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Upper 4x4 grid */}

      <section aria-label="Homepage Past Work" className="mb-10">
        <RotatedTextBlock
          text="Welcome to my portfolio! I'm Frances, a ceramic artist specializing in functional pottery. I create handmade bowls, mugs, plates, and decorative pieces that blend form and function. Each piece is crafted with care and attention to detail, reflecting my passion for ceramics. Explore my collection to find unique, handcrafted items that bring beauty and utility to your everyday life."/>
        

      </section>

      <section aria-label="Homepage Item Grid" className="mb-10">
        <ItemGrid />
        

      </section>

    </div>
  );
}

export default Home;
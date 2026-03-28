"use client";

import { useState } from "react";
import "../components/ui/FilterHeading";

function About() {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Upper 4x4 grid */}

      <section aria-label="Homepage Past Work" className="mb-10">
        

      </section>

      <section aria-label="Homepage Item Grid" className="mb-10">
        <p className="text-2xl font-bold mb-4">About Me</p>
        

      </section>

    </div>
  );
}

export default About;
"use client";

import { useState } from "react";

function About() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Hero / Intro */}
      <section aria-label="Introduction" className="mb-10">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-8">
          <p className="text-base leading-relaxed sm:w-3/5">
            Designer passionate about solving complex and ambiguous problems
            through user-centered design and creative solutions.
          </p>
          <img
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-sm object-cover"
            src="/images/myhead.png"
            draggable={false}
            alt="Profile photo"
          />
        </div>
      </section>

      {/* Education & Experience */}
      <section aria-label="Education and Experience" className="space-y-10">

        {/* Education */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Education</h2>
          <p className="text-sm leading-relaxed">
            Northeastern University <br />
            B.S. in Computer Science & Design <br />
            Class of 2027
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="space-y-5">

            <div>
              <p className="text-sm font-semibold">Ahold Delhaize</p>
              <p className="text-sm ">Mobile Application Designer & Engineer</p>
              <p className="text-sm ">June 2025 – Dec. 2025</p>
            </div>

            <div>
              <p className="text-sm font-semibold">SCOUT – Northeastern&apos;s Student Design Collective</p>
              <p className="text-sm ">Lead UX/UI Designer</p>
              <p className="text-sm ">Sept. 2025 – Jan. 2026</p>
            </div>

            <div>
              <p className="text-sm">MOHAI</p>
              <p className="text-sm">UX/UI Designer</p>
              <p className="text-sm">June 2024 – Aug. 2024</p>
            </div>

            <div>
              <p className="text-sm font-semibold">Row 34</p>
              <p className="text-sm">Host</p>
              <p className="text-sm">Aug. 2024 – Jan. 2025</p>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}

export default About;
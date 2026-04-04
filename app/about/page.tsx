"use client";

import { useState } from "react";
import FadeIn from "../components/ui/FadeIn";

function About() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Hero / Intro */}
      <section aria-label="Introduction" className="mb-10  fadeInUp-animation">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-8">
          <p className="about-body-text sm:w-2/5">
            Designer passionate about solving complex and ambiguous problems
            through user-centered design and creative solutions.
          </p>
          <img
            className="w-40 h-40 sm:w-100 sm:h-70 rounded-sm object-cover"
            src="/images/myhead.png"
            draggable={false}
            alt="Profile photo"
          />
        </div>
      </section>

      {/* Education & Experience */}
      <section aria-label="Education and Experience" className="space-y-12 fadeInUp-animation">

        {/* Education */}
        <FadeIn>
          <div>
            <h2 className="label-large mb-3">Education</h2>
            
            <p className="about-body-text ">Northeastern University</p>
            <p className="about-body-text ">B.S. in Computer Science & Design</p>
            <p className="about-body-text ">Class of 2027</p>

          </div>
        </FadeIn>

        {/* Experience */}
        <div>
          <h2 className="label-large pb-3">Experience</h2>
          <div className="space-y-10">

            <FadeIn>
            <div>
              <p className="tag-text">Ahold Delhaize</p>
              <p className="about-body-text ">Mobile Application Designer & Engineer</p>
              <p className="about-body-text ">June 2025 – Dec. 2025</p>
            </div>
            </FadeIn>
            <FadeIn>

            <div>
              <p className="tag-text">SCOUT – Northeastern&apos;s Student Design Collective</p>
              <p className="about-body-text ">Lead UX/UI Designer</p>
              <p className="about-body-text ">Sept. 2025 – Jan. 2026</p>
            </div>
            </FadeIn>
            <FadeIn>

            <div>
              <p className="tag-text">MOHAI</p>
              <p className="about-body-text">UX/UI Designer</p>
              <p className="about-body-text">June 2024 – Aug. 2024</p>
            </div>
            </FadeIn>
            <FadeIn>

            <div>
              <p className="tag-text">Row 34</p>
              <p className="about-body-text">Host</p>
              <p className="about-body-text">Aug. 2024 – Jan. 2025</p>
            </div>
            </FadeIn>

          </div>
        </div>

      </section>
    </div>
  );
}

export default About;
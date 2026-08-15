import React from "react";
import ShaderBackground from "@/components/landing/ShaderBackground";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import PreviewShowcase from "@/components/landing/PreviewShowcase";
import KineticTicker from "@/components/landing/KineticTicker";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LandingFooter from "@/components/landing/LandingFooter";

export const metadata = {
  title: "GenX — Automated Resumes & Technical Elegance",
  description:
    "Experience invisible efficiency. GenX structures your professional narrative with uncompromising technical precision, delivering a flawless resume without the cognitive load.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-ui selection:bg-indigo-600 selection:text-white">
      {/* Interactive WebGL Wave Shader Background */}
      <ShaderBackground />

      {/* Navigation */}
      <LandingNavbar />

      {/* Main Sections */}
      <main className="relative z-10 flex-1 flex flex-col">
        <HeroSection />
        <PreviewShowcase />
        <KineticTicker />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}

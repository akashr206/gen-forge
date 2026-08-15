"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ShaderBackground from "@/components/landing/ShaderBackground";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import PreviewShowcase from "@/components/landing/PreviewShowcase";
import KineticTicker from "@/components/landing/KineticTicker";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LandingFooter from "@/components/landing/LandingFooter";
import AuthModal from "@/components/auth/AuthModal";

function AuthParamsListener({ onOpenAuth }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("auth") === "login") {
      onOpenAuth();
    }
  }, [searchParams, onOpenAuth]);

  return null;
}

export default function LandingPageClient() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-ui selection:bg-indigo-600 selection:text-white">
      {/* Interactive WebGL Wave Shader Background */}
      <ShaderBackground />

      {/* URL Auth param detector */}
      <Suspense fallback={null}>
        <AuthParamsListener onOpenAuth={() => setIsAuthOpen(true)} />
      </Suspense>

      {/* Navigation */}
      <LandingNavbar onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10 flex-1 flex flex-col">
        <HeroSection onOpenAuth={() => setIsAuthOpen(true)} />
        <PreviewShowcase onOpenAuth={() => setIsAuthOpen(true)} />
        <KineticTicker />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Login Popup Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        callbackUrl="/resume"
      />
    </div>
  );
}

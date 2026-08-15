"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import ShaderBackground from "@/components/landing/ShaderBackground";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import PreviewShowcase from "@/components/landing/PreviewShowcase";
import KineticTicker from "@/components/landing/KineticTicker";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LandingFooter from "@/components/landing/LandingFooter";
import AuthModal from "@/components/auth/AuthModal";

function AuthParamsListener({ onTriggerAuth }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("auth") === "login") {
      onTriggerAuth();
    }
  }, [searchParams, onTriggerAuth]);

  return null;
}

export default function LandingPageClient() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const router = useRouter();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let reqId;
    function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  const handleOpenAuth = useCallback(() => {
    setIsAuthOpen(true);
  }, []);

  const handleCloseAuth = useCallback(() => {
    setIsAuthOpen(false);
    // Remove query params like ?auth=login from the URL bar on close
    if (typeof window !== "undefined" && window.location.search.includes("auth=")) {
      router.replace("/", { scroll: false });
    }
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-ui selection:bg-indigo-600 selection:text-white">
      {/* Interactive WebGL Wave Shader Background */}
      <ShaderBackground />

      {/* URL Auth param detector */}
      <Suspense fallback={null}>
        <AuthParamsListener onTriggerAuth={handleOpenAuth} />
      </Suspense>

      {/* Navigation */}
      <LandingNavbar onOpenAuth={handleOpenAuth} />

      {/* Main Sections */}
      <main className="relative z-10 flex-1 flex flex-col">
        <HeroSection onOpenAuth={handleOpenAuth} />
        <PreviewShowcase onOpenAuth={handleOpenAuth} />
        <KineticTicker />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Login Popup Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        callbackUrl="/dashboard"
      />
    </div>
  );
}

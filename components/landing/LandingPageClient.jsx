"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

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
    if (typeof window !== "undefined" && window.location.search.includes("auth=")) {
      router.replace("/", { scroll: false });
    }
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-ui selection:bg-indigo-600 selection:text-white bg-[#FCFBF9]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl overflow-hidden relative">
                <motion.div 
                  initial={{ top: "100%" }}
                  animate={{ top: "-100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full bg-white/20 blur-sm transform rotate-45"
                />
                G
              </div>
              <motion.div 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="font-ui text-2xl tracking-widest font-bold text-gray-900 uppercase"
              >
                GenX Studio
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
            className="relative flex flex-col min-h-screen w-full"
          >
            <ShaderBackground />

            <Suspense fallback={null}>
              <AuthParamsListener onTriggerAuth={handleOpenAuth} />
            </Suspense>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingNavbar onOpenAuth={handleOpenAuth} />
            </motion.div>

            <main className="relative z-10 flex-1 flex flex-col">
              <HeroSection onOpenAuth={handleOpenAuth} />
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <PreviewShowcase onOpenAuth={handleOpenAuth} />
              </motion.div>
              
              <KineticTicker />
              <FeaturesSection />
            </main>

            <LandingFooter />
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        callbackUrl="/dashboard"
      />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = ({ onOpenAuth }) => {
  const { data: session } = useSession();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 text-center pt-24 sm:pt-28 pb-12 sm:pb-16 relative"
    >
      <motion.h1 
        variants={item}
        className="font-ui text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.08] sm:leading-[1.05] tracking-tight text-gray-900 max-w-4xl mx-auto mb-4 sm:mb-6 font-bold"
      >
        Your Career,
        <br />
        <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Automatically Refined.
        </span>
      </motion.h1>

      <motion.p 
        variants={item}
        className="font-ui text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
      >
        Experience invisible efficiency. GenX structures your professional
        narrative with uncompromising technical precision, delivering a
        flawless resume without the cognitive load.
      </motion.p>

      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0"
      >
        {session?.user ? (
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.25)] hover:shadow-[0_0_40px_rgba(79,70,229,0.35)] hover:scale-[1.02] group"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>OPEN DASHBOARD</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded bg-white/80 backdrop-blur-md border border-indigo-200/80 text-indigo-700 font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:shadow-[0_0_40px_rgba(79,70,229,0.25)] hover:scale-[1.02] group"
          >
            <span>START BUILDING</span>
            <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;

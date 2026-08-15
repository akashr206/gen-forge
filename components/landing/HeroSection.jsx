"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";

const HeroSection = ({ onOpenAuth }) => {
  const { data: session } = useSession();

  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center px-6 text-center pt-28 pb-16 relative">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-indigo-100/80 text-indigo-700 text-xs font-mono mb-8 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <span>Technical Elegance • Automated Resume Engine</span>
      </div>

      {/* Main Title */}
      <h1 className="font-ui text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.05] tracking-tight text-gray-900 max-w-4xl mx-auto mb-6 font-bold">
        Your Career,
        <br />
        <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Automatically Refined.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="font-ui text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Experience invisible efficiency. GenX structures your professional
        narrative with uncompromising technical precision, delivering a
        flawless resume without the cognitive load.
      </p>

      {/* Primary CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {session?.user ? (
          <Link
            href="/resume"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.25)] hover:shadow-[0_0_40px_rgba(79,70,229,0.35)] hover:scale-[1.02] group"
          >
            <LayoutDashboard className="w-4 h-4" />
            OPEN DASHBOARD
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        ) : (
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/80 backdrop-blur-md border border-indigo-200/80 text-indigo-700 font-mono text-sm uppercase tracking-wider font-semibold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:shadow-[0_0_40px_rgba(79,70,229,0.25)] hover:scale-[1.02] group"
          >
            START BUILDING
            <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

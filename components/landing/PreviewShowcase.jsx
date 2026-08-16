"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles } from "lucide-react";

const PreviewShowcase = ({ onOpenAuth }) => {
  const { data: session } = useSession();

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-24 relative z-20">
      <div className="relative rounded-2xl p-1.5 sm:p-2 bg-gradient-to-b from-indigo-100/60 to-white/40 shadow-2xl border border-white/80 backdrop-blur-xl">
        <div className="h-10 px-3 sm:px-4 bg-white/70 backdrop-blur-md rounded-t-xl border-b border-gray-200/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-400/80" />
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-400/80" />
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 sm:ml-3 text-xs font-mono text-gray-500 hidden sm:inline truncate max-w-[200px]">
              workspace/john_doe_resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-indigo-600 bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-100/50">
              <Sparkles className="w-3 h-3" /> AI-Optimized Layout
            </span>
            {session?.user ? (
              <Link
                href="/resume"
                className="text-xs font-mono text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Open Studio →
              </Link>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-mono text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Open Studio →
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-gray-50/50 rounded-b-xl overflow-hidden min-h-[460px]">
          {/* Left Pane: Data Input */}
          <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200/60 bg-white/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-xs font-mono font-bold tracking-wider text-gray-700 uppercase">
                  Content Engine
                </span>
                <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Live Preview
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Full Name
                  </label>
                  <div className="h-9 px-3 bg-white border border-gray-200 rounded text-sm text-gray-800 flex items-center font-ui">
                    John Doe
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Professional Headline
                  </label>
                  <div className="h-9 px-3 bg-white border border-gray-200 rounded text-sm text-gray-800 flex items-center font-ui">
                    Senior Full Stack Engineer
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Experience Entry
                  </label>
                  <div className="p-2.5 bg-white border border-gray-200 rounded text-xs text-gray-600 font-mono leading-relaxed space-y-1">
                    <p className="text-gray-900 font-semibold">Senior Software Engineer — Tech Innovations</p>
                    <p className="text-gray-500">• Led migration to microservices with 40% latency drop</p>
                    <p className="text-gray-500">• Mentored 3 developers, reduced bugs by 25%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Pixel-Perfect Formatting</span>
              <span className="text-indigo-600 font-semibold">Ready to Export</span>
            </div>
          </div>

          {/* Right Pane: A4 Preview */}
          <div className="lg:col-span-7 p-4 sm:p-8 flex items-center justify-center bg-slate-100/60 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
            
            <div className="w-full max-w-[420px] aspect-[210/297] bg-white shadow-xl rounded-sm p-6 sm:p-8 border border-gray-200/80 font-serif transform hover:scale-[1.01] hover:shadow-indigo-500/10 transition-all duration-300 relative z-10">
              <div className="text-center pb-4 border-b border-gray-200 mb-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">John Doe</h2>
                <p className="text-xs text-gray-600 font-sans mt-0.5">Senior Full Stack Engineer</p>
                <p className="text-[10px] text-gray-500 font-sans mt-1.5 flex items-center justify-center gap-1.5">
                  <span className="text-blue-700">john.doe@example.com</span>
                  <span>—</span>
                  <span>+1 (555) 123-4567</span>
                  <span>—</span>
                  <span className="text-blue-700">github.com/johndoe</span>
                </p>
              </div>

              <div className="space-y-3 text-left">
                <div>
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 font-sans">
                    Experience
                  </h3>
                  <div className="flex justify-between items-baseline text-[11px] font-sans">
                    <span className="font-semibold text-gray-900">Senior Software Engineer</span>
                    <span className="text-gray-500 text-[10px]">Jan 2021 - Present | Remote</span>
                  </div>
                  <p className="text-[10px] text-gray-600 italic font-sans">Tech Innovations Inc.</p>
                  <ul className="text-[10px] text-gray-700 font-sans mt-1 space-y-1 list-disc pl-3">
                    <li>Led microservices migration using Node.js & Docker.</li>
                    <li>Reduced average page load time by <strong className="font-semibold text-gray-900">40%</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewShowcase;

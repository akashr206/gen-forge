import React from "react";
import { Sparkles, Type, Eye, FileDown } from "lucide-react";

const features = [
  {
    num: "01",
    icon: Sparkles,
    title: "Intelligent Structuring",
    description:
      "Input structured data or markdown; GenX automatically organizes it into a technically perfect hierarchy. Focus entirely on content, not tedious formatting.",
  },
  {
    num: "02",
    icon: Type,
    title: "Editorial Typography",
    description:
      "Built on curated fonts including TeX Gyre Pagella, Hanken Grotesk, Latin Modern Roman, and Noto Sans, ensuring your document reads like a published publication.",
  },
  {
    num: "03",
    icon: Eye,
    title: "Instant Multi-Page Engine",
    description:
      "Split-pane workspace with zero-latency coordinate measurement. Prevents orphaned headers, aligns page margins, and previews exact A4 print cuts in real time.",
  },
  {
    num: "04",
    icon: FileDown,
    title: "Flawless ATS & PDF Export",
    description:
      "Generate pixel-perfect, fully selectable vector PDFs with clickable hyperlinks designed specifically for modern Applicant Tracking Systems and hiring managers.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-14 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider">
          Core Capabilities
        </div>
        <h2 className="font-ui text-3xl sm:text-4xl text-gray-900 font-bold tracking-tight mb-3">
          Engineered Excellence
        </h2>
        <p className="font-ui text-base sm:text-lg text-gray-600 max-w-xl">
          A system designed for speed and professional sophistication, removing
          friction from the resume creation process.
        </p>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.num}
              className="bg-white/70 backdrop-blur-md border border-white/80 p-8 rounded-2xl relative group overflow-hidden shadow-sm hover:shadow-xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Oversized Watermark Number */}
              <div className="absolute top-4 right-6 font-mono text-5xl sm:text-6xl font-bold text-indigo-600/10 select-none group-hover:text-indigo-600/20 transition-colors duration-300">
                {f.num}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="font-ui text-xl font-bold text-gray-900 mb-2.5">
                {f.title}
              </h3>
              <p className="font-ui text-sm sm:text-base text-gray-600 leading-relaxed">
                {f.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;

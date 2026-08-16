"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GUIDE_SECTIONS = [
  {
    id: "experience",
    label: "Experience",
    title: "Writing High-Impact Experience",
    content: (
      <div className="space-y-8">
        <p className="text-[16px] text-slate-600 leading-relaxed font-ui">
          The AI engine excels at formatting and structuring, but the quality of the raw facts you provide dictates the final ATS score. Focus on outcomes rather than mere responsibilities.
        </p>
        
        <div className="pl-6 border-l-[3px] border-indigo-500/20 py-2">
          <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-[0.1em] mb-4">
            The X-Y-Z Formula
          </p>
          <p className="text-lg font-medium text-slate-800 font-ui leading-relaxed tracking-tight">
            "Accomplished <span className="text-indigo-600">X</span>, as measured by <span className="text-indigo-600">Y</span>, by doing <span className="text-indigo-600">Z</span>."
          </p>
          <p className="text-sm text-slate-500 mt-3 font-ui italic">
            e.g., "Scaled payment microservice with Node.js & Redis, reducing p99 response times by 40% for 1M+ transactions."
          </p>
        </div>

        <ul className="space-y-5 text-slate-600 text-base font-ui list-disc pl-5">
          <li className="pl-2 leading-relaxed">
            <strong className="text-slate-900 font-medium">Include real metrics:</strong> Percentages, scale, cost savings, or time efficiency.
          </li>
          <li className="pl-2 leading-relaxed">
            <strong className="text-slate-900 font-medium">Action-driven verbs:</strong> Start points with words like Architected, Engineered, or Spearheaded.
          </li>
          <li className="pl-2 leading-relaxed">
            <strong className="text-slate-900 font-medium">Mention the stack:</strong> Explicitly state the specific technologies used to achieve the outcome.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "jd-tailoring",
    label: "Tailoring",
    title: "Targeting the Job Description",
    content: (
      <div className="space-y-8 font-ui">
        <p className="text-[16px] text-slate-600 leading-relaxed">
          Pasting the full Job Description (JD) allows the AI engine to cross-reference the job requirements with your experience, injecting ATS-optimized keywords naturally.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div>
            <h4 className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-[0.1em] mb-4">
              What to Paste
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Include the "Requirements", "Responsibilities", and "Qualifications" sections from the job posting. Do not worry about formatting, raw text is perfect.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-[0.1em] mb-4">
              How AI Uses It
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              The engine weaves target keywords seamlessly into your Professional Summary and Experience points, avoiding obvious keyword stuffing while maximizing ATS match rates.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "skills",
    label: "Skills & Structure",
    title: "Structuring Skills & Projects",
    content: (
      <div className="space-y-8 font-ui">
        <p className="text-[16px] text-slate-600 leading-relaxed">
          Group related technologies together. This helps recruiters and ATS parsers quickly scan your domain competency and categorize your expertise.
        </p>

        <div className="bg-[#FCFBF9] rounded-xl p-8 border border-[#E2E8F0]/50 shadow-sm">
          <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-[0.1em] mb-6">
            Recommended Grouping
          </p>
          <div className="space-y-4 text-[13px] font-mono text-slate-600">
            <div><strong className="text-slate-900 font-medium">Languages:</strong> TypeScript, JavaScript, Python, Go</div>
            <div><strong className="text-slate-900 font-medium">Frameworks:</strong> React, Next.js, Node.js</div>
            <div><strong className="text-slate-900 font-medium">Cloud & Tools:</strong> AWS, Docker, Kubernetes, Git</div>
          </div>
        </div>

        <p className="text-sm text-slate-500 italic">
          Note: You do not need to format this perfectly in the input fields. The AI will automatically categorize, group, and apply standard markdown formatting.
        </p>
      </div>
    ),
  },
];

export default function ResumeGuideModal({ isOpen, onClose }) {
  const [activeSectionId, setActiveSectionId] = useState("experience");

  const currentSection =
    GUIDE_SECTIONS.find((s) => s.id === activeSectionId) || GUIDE_SECTIONS[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-3xl p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-2xl rounded-xl shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-white/80 z-50 flex flex-col min-h-[500px] max-h-[85vh]"
        showCloseButton={false}
      >
        <DialogHeader className="px-10 pt-10 pb-8 flex flex-row items-start justify-between space-y-0">
          <div className="text-left">
            <DialogTitle className="text-[28px] font-medium text-slate-900 font-ui tracking-tight leading-none">
              Data Entry Guide
            </DialogTitle>
            <DialogDescription className="text-slate-500 mt-3 font-ui text-[15px]">
              Principles for generating a high-converting, ATS-optimized resume.
            </DialogDescription>
          </div>
          <button
            onClick={() => onClose(false)}
            className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50 focus:outline-none"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="px-10 border-b border-slate-100 flex gap-10">
          {GUIDE_SECTIONS.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`pb-4 text-[15px] font-ui transition-all relative ${
                  isActive
                    ? "text-slate-900 font-medium"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {sec.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-10 py-10 overflow-y-auto flex-1">
          <div className="max-w-2xl">
            <h3 className="text-[22px] font-medium text-slate-900 font-ui mb-8 tracking-tight">
              {currentSection.title}
            </h3>
            {currentSection.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

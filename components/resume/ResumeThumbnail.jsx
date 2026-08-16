"use client";

import React, { useRef, useState, useEffect } from "react";
import LiveResumePreview from "./LiveResumePreview";

export default function ResumeThumbnail({ resume }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // LiveResumePreview enforces w-[210mm] which translates to approx 793.7px
        // We scale it down so it fits perfectly in the container.
        setScale(entry.contentRect.width / 793.7);
      }
    });

    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-[1/1.414] overflow-hidden relative bg-white"
    >
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <LiveResumePreview data={resume} />
      </div>
      
      {/* Invisible overlay to block mouse interactions with the mini-resume */}
      <div className="absolute inset-0 z-10 pointer-events-none"></div>
    </div>
  );
}

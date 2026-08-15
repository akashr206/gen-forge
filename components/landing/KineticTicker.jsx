import React from "react";

const KineticTicker = () => {
  const items = [
    "GENERATE",
    "STRUCTURE",
    "OPTIMIZE",
    "ATS COMPLIANT",
    "PAGINATE",
    "EXPORT",
  ];

  return (
    <section className="py-8 bg-indigo-600 text-white my-16 overflow-hidden transform -rotate-1 shadow-lg select-none">
      <div className="ticker-wrap w-full font-ui text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest opacity-90">
        <div className="ticker-content flex gap-12 whitespace-nowrap">
          {items.map((item, idx) => (
            <span key={`a-${idx}`} className="flex items-center gap-12">
              <span>{item}</span>
              <span className="text-indigo-300 text-2xl">•</span>
            </span>
          ))}
          {items.map((item, idx) => (
            <span key={`b-${idx}`} className="flex items-center gap-12">
              <span>{item}</span>
              <span className="text-indigo-300 text-2xl">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KineticTicker;

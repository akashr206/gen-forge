import React from 'react';

const ResumeSkeleton = () => (
  <div className="w-[210mm] h-[297mm] bg-white shadow-2xl p-16 @container flex flex-col gap-10 shrink-0 border border-slate-100">
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-8">
      <div className="h-10 w-2/3 bg-slate-200/70 rounded animate-pulse"></div>
      <div className="h-5 w-1/3 bg-slate-200/60 rounded animate-pulse"></div>
      <div className="flex gap-4 mt-2">
        <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse"></div>
        <div className="h-3 w-32 bg-slate-100 rounded-full animate-pulse"></div>
        <div className="h-3 w-20 bg-slate-100 rounded-full animate-pulse"></div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-3 w-full bg-slate-50 rounded-full animate-pulse"></div>
        <div className="h-3 w-11/12 bg-slate-50 rounded-full animate-pulse"></div>
        <div className="h-3 w-4/5 bg-slate-50 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    {[1, 2, 3].map(i => (
      <div key={i} className="flex flex-col gap-5">
        <div className="h-6 w-48 bg-slate-200/70 rounded animate-pulse border-b border-slate-50 pb-2"></div>
        <div className="flex flex-col gap-4 mt-2">
          {[1, 2].map(j => (
            <div key={j} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-64 bg-slate-200/50 rounded animate-pulse"></div>
                <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse"></div>
              </div>
              <div className="h-3 w-40 bg-slate-100/50 rounded animate-pulse"></div>
              <div className="mt-1 flex flex-col gap-2">
                <div className="h-2.5 w-full bg-slate-50 rounded-full animate-pulse"></div>
                <div className="h-2.5 w-5/6 bg-slate-50 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ResumeSkeleton;

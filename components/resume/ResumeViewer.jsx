"use client"
import React, { useState, useEffect } from 'react';
import BaseTemplate from './templates/BaseTemplate';
import { VisibilityContext } from './ui/PageBreakable';
import { Minus, Plus } from 'lucide-react';

const FONT_CONFIG = {
  "Latin Modern Sans": {
    family: '"Latin Modern Sans", sans-serif',
    url: "https://cdn.jsdelivr.net/npm/latin-modern-webfont@1.1.0/css/latinmodern-sans.css"
  },
  "Computer Modern": {
    family: '"Latin Modern Roman", "Computer Modern Roman", serif',
    url: "https://cdn.jsdelivr.net/npm/latin-modern-webfont@1.1.0/css/latinmodern-roman.css"
  },
  "Helvetica": {
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  "Arial": {
    family: 'Arial, sans-serif'
  },
  "Roboto": {
    family: '"Roboto", sans-serif',
    url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  },
  "Lato": {
    family: '"Lato", sans-serif',
    url: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
  },
  "Source Sans Pro": {
    family: '"Source Sans 3", "Source Sans Pro", sans-serif',
    url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap"
  },
  "Fira Sans": {
    family: '"Fira Sans", sans-serif',
    url: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap"
  },
  "Noto Sans": {
    family: '"Noto Sans", sans-serif',
    url: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap"
  },
  "TeX Gyre Heros": {
    family: '"TeX Gyre Heros", "Helvetica Neue", Helvetica, sans-serif'
  },
  "TeX Gyre Pagella": {
    family: '"TeX Gyre Pagella", "Palatino Linotype", Palatino, serif'
  },
  "EB Garamond": {
    family: '"EB Garamond", serif',
    url: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap"
  },
  "Times New Roman": {
    family: '"Times New Roman", Times, serif'
  }
};

const ResumeSkeleton = () => (
  <div className="w-[210mm] h-[297mm] bg-white shadow-2xl p-16 @container flex flex-col gap-10 shrink-0 border border-slate-100">
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-8">
      <div className="h-10 w-2/3 bg-slate-200/70 rounded-md animate-pulse"></div>
      <div className="h-5 w-1/3 bg-slate-200/60 rounded-md animate-pulse"></div>
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
        <div className="h-6 w-48 bg-slate-200/70 rounded-md animate-pulse border-b border-slate-50 pb-2"></div>
        <div className="flex flex-col gap-4 mt-2">
          {[1, 2].map(j => (
            <div key={j} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-64 bg-slate-200/50 rounded-md animate-pulse"></div>
                <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse"></div>
              </div>
              <div className="h-3 w-40 bg-slate-100/50 rounded-md animate-pulse"></div>
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

const ResumeViewer = ({ data }) => {
  const [pages, setPages] = useState(null);
  const [zoom, setZoom] = useState(0.8);
  const [fontsReady, setFontsReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1.0);

  const headerFont = data?.design?.headerFont;
  const bodyFont = data?.design?.bodyFont;

  useEffect(() => {
    let isMounted = true;
    setFontsReady(false);
    
    const loadFonts = async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
      await document.fonts.ready;
      if (isMounted) {
        setFontsReady(true);
      }
    };
    loadFonts();
    
    return () => { isMounted = false; };
  }, [headerFont, bodyFont]);

  useEffect(() => {
    if (!data || !fontsReady) return;

    const timer = setTimeout(() => {
      const container = document.getElementById('hidden-continuous-resume');
      if (!container) return;
      
      const elements = Array.from(container.querySelectorAll('.page-breakable'));
      if (elements.length === 0) {
         setPages([{ shiftY: 0, visibleIds: new Set() }]);
         return;
      }

      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width; 
      const pageHeight = width * 1.414; 
      
      const verticalMargin = width * 0.065;
      const maxBottomCoordinate = pageHeight - verticalMargin;

      const calculatedPages = [];
      let currentPage = { shiftY: 0, visibleIds: new Set() };
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offsetTop = rect.top - containerRect.top;
        const height = rect.height;
        
        const relativeTop = offsetTop - currentPage.shiftY;
        
        if (relativeTop + height > maxBottomCoordinate && currentPage.visibleIds.size > 0) {
          calculatedPages.push(currentPage);
          
          currentPage = {
            shiftY: offsetTop - verticalMargin,
            visibleIds: new Set([el.id])
          };
        } else {
          currentPage.visibleIds.add(el.id);
        }
      });
      
      calculatedPages.push(currentPage);
      setPages(calculatedPages);
      setIsInitialLoad(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [data, fontsReady]);

  if (!data) return null;

  const headerFontConfig = FONT_CONFIG[data.design?.headerFont] || FONT_CONFIG["Helvetica"];
  const bodyFontConfig = FONT_CONFIG[data.design?.bodyFont] || FONT_CONFIG["Roboto"];

  const pxToCqw = (px) => (px / 793.7) * 100;
  
  const cssVariables = {
    '--resume-header-font': headerFontConfig.family,
    '--resume-body-font': bodyFontConfig.family,
    '--resume-margin': `${pxToCqw(data.design?.margin ?? 56)}cqw`,
    '--resume-section-gap': `${pxToCqw(data.design?.sectionGap ?? 28)}cqw`,
    '--resume-item-gap': `${pxToCqw(data.design?.itemGap ?? 8)}cqw`,
    '--resume-title-size': `${pxToCqw(data.design?.fontSizes?.title ?? 52)}cqw`,
    '--resume-subtitle-size': `${pxToCqw(data.design?.fontSizes?.subtitle ?? 22)}cqw`,
    '--resume-heading-size': `${pxToCqw(data.design?.fontSizes?.sectionHeader ?? 24)}cqw`,
    '--resume-item-title-size': `${pxToCqw(data.design?.fontSizes?.itemTitle ?? 18)}cqw`,
    '--resume-item-subtitle-size': `${pxToCqw(data.design?.fontSizes?.itemSubtitle ?? 16)}cqw`,
    '--resume-body-size': `${pxToCqw(data.design?.fontSizes?.body ?? 14)}cqw`
  };

  return (
    <div 
      className="w-full h-full relative overflow-y-auto overflow-x-hidden print:bg-white print:overflow-visible flex flex-col items-center print:h-auto print:block"
      style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {headerFontConfig.url && <link href={headerFontConfig.url} rel="stylesheet" />}
      {bodyFontConfig.url && bodyFontConfig.url !== headerFontConfig.url && <link href={bodyFontConfig.url} rel="stylesheet" />}
      
      <div 
        className="absolute top-0 left-0 opacity-0 pointer-events-none -z-10 overflow-hidden w-[210mm] shrink-0 bg-white @container" 
        style={{ 
          visibility: 'hidden',
          ...cssVariables
        }}
      >
        <div id="hidden-continuous-resume" className="relative w-full">
           <BaseTemplate data={data} />
        </div>
      </div>

      <div 
        className="flex flex-col items-center gap-8 py-12 px-8 print:p-0 print:gap-0 origin-top transition-transform duration-200 print-no-scale"
        style={{ transform: `scale(${zoom})` }}
      >
        {isInitialLoad ? (
          <ResumeSkeleton />
        ) : pages && pages.map((page, index) => (
          <div 
            key={index}
            className="w-[210mm] shrink-0 bg-white shadow-xl @container print:shadow-none print:w-[210mm] print:m-0 print:break-after-page print:break-inside-avoid relative overflow-hidden"
            style={{ 
              height: '297mm',
              ...cssVariables
            }}
          >
            <div style={{ marginTop: `-${page.shiftY}px` }} className="w-full relative">
              <VisibilityContext.Provider value={page.visibleIds}>
                <BaseTemplate data={data} />
              </VisibilityContext.Provider>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 flex items-center gap-2 bg-white/90 backdrop-blur shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 rounded-full p-1.5 z-50 print:hidden">
        <button 
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="p-2.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors text-gray-600 hover:text-gray-900"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button 
          onClick={resetZoom}
          className="px-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors w-12 text-center"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button 
          onClick={handleZoomIn}
          disabled={zoom >= 2.0}
          className="p-2.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors text-gray-600 hover:text-gray-900"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ResumeViewer;

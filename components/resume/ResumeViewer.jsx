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

import ResumeSkeleton from './ui/ResumeSkeleton';

const ResumeViewer = ({ data, hideUI = false }) => {
  const [pages, setPages] = useState(null);
  const [zoom, setZoom] = useState(0.8);
  const [fontsReady, setFontsReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 440) {
        setZoom(0.42);
      } else if (w < 640) {
        setZoom(0.48);
      } else if (w < 1024) {
        setZoom(0.65);
      }
    }
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(Number((prev + 0.1).toFixed(2)), 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(Number((prev - 0.1).toFixed(2)), 0.3));
  const resetZoom = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setZoom(window.innerWidth < 440 ? 0.42 : 0.48);
    } else {
      setZoom(1.0);
    }
  };

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
      className={`w-full h-full relative overflow-y-auto overflow-x-hidden print:bg-white print:overflow-visible flex flex-col items-center print:h-auto print:block ${hideUI ? '' : 'bg-slate-50/50'}`}
      style={hideUI ? {} : {
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {headerFontConfig.url && <link href={headerFontConfig.url} rel="stylesheet" />}
      {bodyFontConfig.url && bodyFontConfig.url !== headerFontConfig.url && <link href={bodyFontConfig.url} rel="stylesheet" />}
      
      <div 
        className="absolute top-0 left-0 opacity-0 pointer-events-none -z-10 overflow-hidden w-[210mm] shrink-0 bg-white @container print:hidden" 
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
        className={`w-full flex-1 flex flex-col items-center print:!block print:!p-0 ${hideUI ? 'py-0 px-0' : 'py-6 sm:py-12'}`}
      >
        <div 
          style={{ 
            width: isInitialLoad ? 'auto' : `${793.7 * zoom}px`,
            height: isInitialLoad ? 'auto' : pages ? `${(1122.5 * pages.length + Math.max(0, pages.length - 1) * 32) * zoom}px` : 'auto',
          }}
          className="relative transition-all duration-150 print:!w-auto print:!h-auto"
        >
          <div 
            style={{ 
              zoom: zoom,
              width: '793.7px',
            }}
            className="flex flex-col items-center gap-8 print:!p-0 print:!gap-0 print:![zoom:1] print:!w-auto origin-top-left transition-all duration-150"
          >
            {isInitialLoad ? (
              <ResumeSkeleton />
            ) : pages && pages.map((page, index) => (
              <div 
                key={index}
                className="w-[210mm] shrink-0 bg-white shadow-xl @container print:shadow-none print:w-[210mm] print:m-0 print:break-after-page print:break-inside-avoid relative"
                style={{ 
                  height: '297mm',
                  ...cssVariables
                }}
              >
                <div className="w-full relative">
                  <VisibilityContext.Provider value={page.visibleIds}>
                    <BaseTemplate data={data} />
                  </VisibilityContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!hideUI && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/60 rounded-full p-1 sm:p-1.5 z-40 print:hidden">
          <button  
            onClick={handleZoomOut}
            disabled={zoom <= 0.3}
            className="p-2 sm:p-2.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-colors text-gray-600 hover:text-gray-900"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={resetZoom}
            className="px-1.5 sm:px-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors w-10 sm:w-12 text-center"
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button 
            onClick={handleZoomIn}
            disabled={zoom >= 2.0}
            className="p-2 sm:p-2.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-colors text-gray-600 hover:text-gray-900"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;

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

const ResumeViewer = ({ data }) => {
  const [pages, setPages] = useState(null);
  const [zoom, setZoom] = useState(0.8);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1.0);

  useEffect(() => {
    if (!data) return;

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
      
      const pagePadding = width * 0.07; 
      const availableHeight = pageHeight - (pagePadding * 2);

      const calculatedPages = [];
      let currentPage = { shiftY: 0, visibleIds: new Set() };
      
      elements.forEach((el) => {
        const offsetTop = el.offsetTop;
        const height = el.offsetHeight;
        
        const relativeTop = offsetTop - currentPage.shiftY;
        
        if (relativeTop + height > availableHeight && currentPage.visibleIds.size > 0) {
          calculatedPages.push(currentPage);
          
          currentPage = {
            shiftY: offsetTop - pagePadding,
            visibleIds: new Set([el.id])
          };
        } else {
          currentPage.visibleIds.add(el.id);
        }
      });
      
      calculatedPages.push(currentPage);
      setPages(calculatedPages);
    }, 150);

    return () => clearTimeout(timer);
  }, [data]);

  if (!data) return null;

  const headerFontConfig = FONT_CONFIG[data.design?.headerFont] || FONT_CONFIG["Helvetica"];
  const bodyFontConfig = FONT_CONFIG[data.design?.bodyFont] || FONT_CONFIG["Roboto"];

  return (
    <div 
      className="w-full h-full relative overflow-y-auto overflow-x-hidden print:bg-white print:overflow-visible flex flex-col items-center"
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
          '--resume-header-font': headerFontConfig.family,
          '--resume-body-font': bodyFontConfig.family
        }}
      >
        <div id="hidden-continuous-resume" className="relative w-full">
           <BaseTemplate data={data} />
        </div>
      </div>

      <div 
        className="flex flex-col items-center gap-8 py-12 px-8 print:p-0 print:gap-0 origin-top transition-transform duration-200"
        style={{ transform: `scale(${zoom})` }}
      >
        {pages ? pages.map((page, index) => (
          <div 
            key={index}
            className="w-[210mm] shrink-0 bg-white shadow-xl @container print:shadow-none print:w-[210mm] print:m-0 relative overflow-hidden"
            style={{ 
              height: '297mm',
              '--resume-header-font': headerFontConfig.family,
              '--resume-body-font': bodyFontConfig.family
            }}
          >
            <div style={{ transform: `translateY(-${page.shiftY}px)` }} className="w-full relative">
              <VisibilityContext.Provider value={page.visibleIds}>
                <BaseTemplate data={data} />
              </VisibilityContext.Provider>
            </div>
          </div>
        )) : (
          <div className="w-[210mm] h-[297mm] bg-white shadow-xl flex items-center justify-center text-gray-400 text-lg">
            Rendering pages...
          </div>
        )}
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

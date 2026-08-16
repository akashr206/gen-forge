"use client"
import React from 'react';
import BaseTemplate from './templates/BaseTemplate';
import ResumeSkeleton from './ui/ResumeSkeleton';

const FONT_CONFIG = {
  "Latin Modern Sans": { family: '"Latin Modern Sans", sans-serif', url: "https://cdn.jsdelivr.net/npm/latin-modern-webfont@1.1.0/css/latinmodern-sans.css" },
  "Computer Modern": { family: '"Latin Modern Roman", "Computer Modern Roman", serif', url: "https://cdn.jsdelivr.net/npm/latin-modern-webfont@1.1.0/css/latinmodern-roman.css" },
  "Helvetica": { family: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  "Arial": { family: 'Arial, sans-serif' },
  "Roboto": { family: '"Roboto", sans-serif', url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" },
  "Lato": { family: '"Lato", sans-serif', url: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" },
  "Source Sans Pro": { family: '"Source Sans 3", "Source Sans Pro", sans-serif', url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap" },
  "Fira Sans": { family: '"Fira Sans", sans-serif', url: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap" },
  "Noto Sans": { family: '"Noto Sans", sans-serif', url: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" },
  "TeX Gyre Heros": { family: '"TeX Gyre Heros", "Helvetica Neue", Helvetica, sans-serif' },
  "TeX Gyre Pagella": { family: '"TeX Gyre Pagella", "Palatino Linotype", Palatino, serif' },
  "EB Garamond": { family: '"EB Garamond", serif', url: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap" },
  "Times New Roman": { family: '"Times New Roman", Times, serif' }
};

const LiveResumePreview = ({ data, showSkeleton = false }) => {
  if (showSkeleton) return <ResumeSkeleton />;
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
      className="w-[210mm] min-h-[297mm] bg-white @container flex flex-col items-center"
      style={cssVariables}
    >
      {headerFontConfig.url && <link href={headerFontConfig.url} rel="stylesheet" />}
      {bodyFontConfig.url && bodyFontConfig.url !== headerFontConfig.url && <link href={bodyFontConfig.url} rel="stylesheet" />}
      
      <div className="w-full h-full relative">
        <BaseTemplate data={data} />
      </div>
    </div>
  );
};

export default LiveResumePreview;

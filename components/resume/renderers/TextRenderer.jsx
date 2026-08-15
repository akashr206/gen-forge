import React from 'react';
import PageBreakable from '../ui/PageBreakable';
import ContentBlock from '../ui/ContentBlock';

const TextRenderer = ({ section }) => {
  return (
    <PageBreakable id={`text-${section.id || section.heading}`}>
      <div className="flex flex-col break-inside-avoid">
        {section.heading && (
          <h3 className="text-[length:var(--resume-heading-size)] font-bold text-gray-800 uppercase tracking-wider border-b-[0.2cqw] border-gray-300 pb-[length:var(--resume-item-gap)] font-resume-header mb-[length:calc(var(--resume-item-gap)*1.5)]">
            {section.heading}
          </h3>
        )}
        <ContentBlock content={section.content} />
      </div>
    </PageBreakable>
  );
};

export default TextRenderer;

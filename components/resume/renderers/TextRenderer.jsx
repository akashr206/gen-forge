import React from 'react';
import PageBreakable from '../ui/PageBreakable';
import ContentBlock from '../ui/ContentBlock';

const TextRenderer = ({ section }) => {
  const contentStr = typeof section.content === 'string' ? section.content : (Array.isArray(section.content) ? section.content.join('\n\n') : '');
  const chunks = contentStr 
      ? contentStr.split(/\n\n|\n(?=(?:-|\*|\d+\.) )/).map(c => c.trim()).filter(Boolean)
      : [];
  const safeChunks = chunks.length > 0 ? chunks : [''];

  return (
    <div className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)]">
      {safeChunks.map((chunk, chunkIndex) => (
        <PageBreakable key={chunkIndex} id={`text-${section.id || section.heading}-${chunkIndex}`}>
          <div className="flex flex-col break-inside-avoid">
            {chunkIndex === 0 && section.heading && (
              <h3 className="text-[length:var(--resume-heading-size)] font-bold text-gray-800 uppercase tracking-wider border-b-[0.2cqw] border-gray-300 pb-[length:var(--resume-item-gap)] font-resume-header mb-[length:calc(var(--resume-item-gap)*1.5)]">
                {section.heading}
              </h3>
            )}
            {chunk && (
              <ContentBlock content={chunk} />
            )}
          </div>
        </PageBreakable>
      ))}
    </div>
  );
};

export default TextRenderer;

import React from 'react';
import ContentBlock from '../ui/ContentBlock';
import PageBreakable from '../ui/PageBreakable';

const TimelineRenderer = ({ section }) => {
  if (!section.items) return null;

  return (
    <div className="flex flex-col gap-[length:var(--resume-section-gap)]">
      {section.items.map((item, index) => (
        <PageBreakable key={index} id={`timeline-${section.id || section.heading}-${index}`}>
          <div className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] break-inside-avoid">
            <div className="flex justify-between items-baseline gap-[length:var(--resume-item-gap)]">
              <h4 className="text-[length:var(--resume-item-title-size)] font-semibold text-gray-900 font-resume-header">{item.primary}</h4>
              {(item.date || item.location) && (
                <span className="text-[length:var(--resume-body-size)] text-gray-500 font-medium text-right shrink-0">
                  {item.location && <span>{item.location} | </span>}
                  {item.date}
                </span>
              )}
            </div>
            {item.secondary && (
              <h5 className="text-[length:var(--resume-item-subtitle-size)] font-medium text-gray-600 italic font-resume-header">{item.secondary}</h5>
            )}
            {item.content && (
              <div className="mt-[length:calc(var(--resume-item-gap)*0.5)]">
                <ContentBlock content={item.content} />
              </div>
            )}
          </div>
        </PageBreakable>
      ))}
    </div>
  );
};

export default TimelineRenderer;

import React from 'react';
import ContentBlock from '../ui/ContentBlock';
import PageBreakable from '../ui/PageBreakable';

const TimelineRenderer = ({ section }) => {
  if (!section.items) return null;

  return (
    <div className="flex flex-col gap-[2.5cqw]">
      {section.items.map((item, index) => (
        <PageBreakable key={index} id={`timeline-${section.id || section.heading}-${index}`}>
          <div className="flex flex-col gap-[0.5cqw] break-inside-avoid">
            <div className="flex justify-between items-baseline gap-[1.5cqw]">
              <h4 className="text-[2.2cqw] font-semibold text-gray-900 font-resume-header">{item.primary}</h4>
              {(item.date || item.location) && (
                <span className="text-[1.8cqw] text-gray-500 font-medium text-right shrink-0">
                  {item.location && <span>{item.location} | </span>}
                  {item.date}
                </span>
              )}
            </div>
            {item.secondary && (
              <h5 className="text-[2cqw] font-medium text-gray-600 italic font-resume-header">{item.secondary}</h5>
            )}
            {item.content && (
              <div className="mt-[0.5cqw]">
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

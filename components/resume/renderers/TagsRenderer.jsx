import React from 'react';
import PageBreakable from '../ui/PageBreakable';

const TagsRenderer = ({ section }) => {
  if (!section.groups) return null;

  return (
    <div className="flex flex-col gap-[1.5cqw]">
      {section.groups.map((group, index) => (
        <PageBreakable key={index} id={`tags-${section.id || section.heading}-${index}`}>
          <div className="flex flex-col gap-[0.2cqw] md:flex-row md:gap-[2cqw] md:items-start break-inside-avoid">
            {group.category && (
              <h4 className="text-[2cqw] font-semibold text-gray-800 w-[20cqw] shrink-0 mt-[0.2cqw]">
                {group.category}
              </h4>
            )}
            <div className="text-[1.8cqw] text-gray-700 leading-relaxed">
              {group.items.join(', ')}
            </div>
          </div>
        </PageBreakable>
      ))}
    </div>
  );
};

export default TagsRenderer;

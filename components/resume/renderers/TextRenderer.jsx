import React from 'react';
import PageBreakable from '../ui/PageBreakable';

const TextRenderer = ({ section }) => {
  return (
    <PageBreakable id={`text-${section.id || section.heading}`}>
      <div className="text-[1.8cqw] text-gray-700 leading-relaxed whitespace-pre-wrap break-inside-avoid">
        {section.content}
      </div>
    </PageBreakable>
  );
};

export default TextRenderer;

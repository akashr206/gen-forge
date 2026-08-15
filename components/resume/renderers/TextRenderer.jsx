import React from 'react';
import PageBreakable from '../ui/PageBreakable';
import ContentBlock from '../ui/ContentBlock';

const TextRenderer = ({ section }) => {
  return (
    <PageBreakable id={`text-${section.id || section.heading}`}>
      <ContentBlock content={section.content} />
    </PageBreakable>
  );
};

export default TextRenderer;

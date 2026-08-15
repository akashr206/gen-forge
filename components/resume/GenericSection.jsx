import React from 'react';
import TextRenderer from './renderers/TextRenderer';
import TimelineRenderer from './renderers/TimelineRenderer';
import TagsRenderer from './renderers/TagsRenderer';
import PageBreakable from './ui/PageBreakable';

const GenericSection = ({ section }) => {
  const { heading, type } = section;

  const renderContent = () => {
    switch (type) {
      case 'text':
        return <TextRenderer section={section} />;
      case 'timeline':
        return <TimelineRenderer section={section} />;
      case 'tags':
        return <TagsRenderer section={section} />;
      default:
        return <div className="text-red-500 text-[1.8cqw]">Unknown section type: {type}</div>;
    }
  };

  return (
    <section className="flex flex-col gap-[2cqw] break-inside-avoid mb-[2cqw]">
      {heading && (
        <PageBreakable id={`section-heading-${section.id || heading}`}>
          <h3 className="text-[3cqw] font-bold text-gray-800 uppercase tracking-widest border-b-[0.2cqw] border-gray-300 pb-[1cqw] font-resume-header">
            {heading}
          </h3>
        </PageBreakable>
      )}
      <div className="pt-[0.5cqw]">
        {renderContent()}
      </div>
    </section>
  );
};

export default GenericSection;

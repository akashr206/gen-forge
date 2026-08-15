import React from 'react';
import TextRenderer from './renderers/TextRenderer';
import TimelineRenderer from './renderers/TimelineRenderer';
import PageBreakable from './ui/PageBreakable';

const GenericSection = ({ section }) => {
  const { heading, type } = section;

  const renderContent = () => {
    switch (type) {
      case 'text':
        return <TextRenderer section={section} />;
      case 'timeline':
        return <TimelineRenderer section={section} />;
      default:
        return <div className="text-red-500 text-[length:var(--resume-body-size)]">Unknown section type: {type}</div>;
    }
  };

  return (
    <section className="flex flex-col gap-[length:calc(var(--resume-section-gap)*0.6)] break-inside-avoid mb-[length:calc(var(--resume-section-gap)*0.6)]">
      {heading && (
        <PageBreakable id={`section-heading-${section.id || heading}`}>
          <h3 className="text-[length:var(--resume-heading-size)] font-bold text-gray-800 uppercase tracking-widest border-b-[0.2cqw] border-gray-300 pb-[length:var(--resume-item-gap)] font-resume-header">
            {heading}
          </h3>
        </PageBreakable>
      )}
      <div className="pt-[length:calc(var(--resume-item-gap)*0.5)]">
        {renderContent()}
      </div>
    </section>
  );
};

export default GenericSection;

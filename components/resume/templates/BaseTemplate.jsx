import React from 'react';
import GenericSection from '../GenericSection';
import PageBreakable from '../ui/PageBreakable';

const BaseTemplate = ({ data }) => {
  const { basics, sections } = data;

  return (
    <div className="px-[length:var(--resume-margin)] py-[6.5cqw] flex flex-col gap-[length:var(--resume-section-gap)] font-resume-body bg-white text-gray-800">
      {/* Header */}
      <PageBreakable id="resume-basics">
        <div className={`flex flex-col gap-[length:var(--resume-item-gap)] ${
          basics.alignment === 'left' ? 'items-start text-left' :
          basics.alignment === 'right' ? 'items-end text-right' :
          'items-center text-center'
        }`}>
          <h1 className="text-[length:var(--resume-title-size)] font-bold leading-tight text-gray-900 font-resume-header">{basics.name}</h1>
          <h2 className="text-[length:var(--resume-subtitle-size)] font-medium text-gray-600 font-resume-header">{basics.title}</h2>
          <ul className={`flex flex-wrap gap-x-[length:calc(var(--resume-item-gap)*2.5)] gap-y-[length:var(--resume-item-gap)] text-[length:var(--resume-body-size)] text-gray-500 mt-[length:calc(var(--resume-item-gap)/2)] ${
            basics.alignment === 'left' ? 'justify-start' :
            basics.alignment === 'right' ? 'justify-end' :
            'justify-center'
          }`}>
            {basics.email && <li>{basics.email}</li>}
            {basics.phone && <li>{basics.phone}</li>}
            {basics.location && <li>{basics.location}</li>}
          </ul>
        </div>
      </PageBreakable>

      {/* Sections */}
      <div className="flex flex-col gap-[length:calc(var(--resume-section-gap)*1.14)]">
        {sections.map((section, index) => (
          <GenericSection key={section.id || index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default BaseTemplate;

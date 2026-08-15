import React from 'react';
import GenericSection from '../GenericSection';
import PageBreakable from '../ui/PageBreakable';

const BaseTemplate = ({ data }) => {
  const { basics, sections } = data;

  return (
    <div className="p-[7cqw] flex flex-col gap-[3.5cqw] font-resume-body bg-white text-gray-800">
      {/* Header */}
      <PageBreakable id="resume-basics">
        <header className="flex flex-col gap-[1.2cqw] border-b-[0.4cqw] border-gray-300 pb-[3cqw]">
          <h1 className="text-[6.5cqw] font-bold leading-tight text-gray-900 font-resume-header">{basics.name}</h1>
          <h2 className="text-[2.8cqw] font-medium text-gray-600 font-resume-header">{basics.title}</h2>
          <ul className="flex flex-wrap gap-x-[2.5cqw] gap-y-[1cqw] text-[1.8cqw] text-gray-500 mt-[0.5cqw]">
            {basics.email && <li>{basics.email}</li>}
            {basics.phone && <li>{basics.phone}</li>}
            {basics.location && <li>{basics.location}</li>}
          </ul>
          {basics.summary && (
            <div className="mt-[2cqw] text-[1.8cqw] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {basics.summary}
            </div>
          )}
        </header>
      </PageBreakable>

      {/* Sections */}
      <div className="flex flex-col gap-[4cqw]">
        {sections.map((section, index) => (
          <GenericSection key={section.id || index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default BaseTemplate;

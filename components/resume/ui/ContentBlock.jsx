import React from 'react';

const ContentBlock = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="flex flex-col gap-[0.5cqw] text-[1.8cqw] text-gray-700 leading-relaxed">
      {content.map((item, index) => {
        if (item.type === 'paragraph') {
          return <p key={index}>{item.text}</p>;
        } else if (item.type === 'bullet') {
          return (
            <div key={index} className="flex gap-[1cqw]">
              <span className="text-gray-400 select-none">•</span>
              <span>{item.text}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContentBlock;

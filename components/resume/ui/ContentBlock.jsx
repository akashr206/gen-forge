import React from 'react';
import ReactMarkdown from 'react-markdown';

const ContentBlock = ({ content }) => {
  if (!content || typeof content !== 'string') return null;

  return (
    <div className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] text-[length:var(--resume-body-size)] text-gray-700 leading-relaxed break-inside-avoid">
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          ul: ({ node, ...props }) => <ul className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] m-0 p-0" {...props} />,
          li: ({ node, ...props }) => (
            <li className="flex items-start gap-[length:var(--resume-item-gap)]">
              <div className="w-[length:calc(var(--resume-body-size)*0.35)] h-[length:calc(var(--resume-body-size)*0.35)] rounded-full bg-gray-400 mt-[length:calc(var(--resume-body-size)*0.65)] shrink-0"></div>
              <span>{props.children}</span>
            </li>
          ),
          a: ({ node, ...props }) => <a className="text-primary hover:underline underline-offset-2" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ContentBlock;

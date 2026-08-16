import React from "react";
import ReactMarkdown from "react-markdown";

const ContentBlock = ({ content }) => {
    if (!content || typeof content !== "string") return null;

    const formattedContent = content.replace(/\n/g, '  \n');

    return (
        <div className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] text-[length:var(--resume-body-size)] text-gray-700 leading-relaxed break-inside-avoid text-justify ">
            <ReactMarkdown
                components={{
                    p: ({ node, ...props }) => <p {...props} />,
                    strong: ({ node, ...props }) => (
                        <strong
                            className="font-semibold text-gray-900"
                            {...props}
                        />
                    ),
                    em: ({ node, ...props }) => (
                        <em className="italic" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul
                            className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] m-0 p-0"
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="flex items-start gap-[1.4cqw]">
                            <div className="w-[0.65cqw] h-[0.65cqw] aspect-square rounded-full bg-gray-700 mt-[0.62em] shrink-0"></div>
                            <div className="flex-1 min-w-0">{props.children}</div>
                        </li>
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className="text-blue-700 print:text-blue-700"
                            {...props}
                        />
                    ),
                }}
            >
                {formattedContent}
            </ReactMarkdown>
        </div>
    );
};

export default ContentBlock;

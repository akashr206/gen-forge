import React from "react";
import ContentBlock from "../ui/ContentBlock";
import PageBreakable from "../ui/PageBreakable";

const TimelineRenderer = ({ section }) => {
    if (!section.items) return null;

    return (
        <div className="flex flex-col gap-[length:var(--resume-section-gap)]">
            {section.items.map((item, index) => {
                const contentStr = typeof item.content === 'string' ? item.content : (Array.isArray(item.content) ? item.content.join('\n\n') : '');
                const chunks = contentStr
                    ? contentStr.split(/\n\n|\n(?=(?:-|\*|\d+\.) )/).map(c => c.trim()).filter(Boolean)
                    : [];
                const safeChunks = chunks.length > 0 ? chunks : [''];

                return (
                    <div key={index} className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)]">
                        {safeChunks.map((chunk, chunkIndex) => (
                            <PageBreakable
                                key={chunkIndex}
                                id={`timeline-${section.id || section.heading}-${index}-${chunkIndex}`}
                            >
                                <div className="flex flex-col gap-[length:calc(var(--resume-item-gap)*0.5)] break-inside-avoid">
                                    {chunkIndex === 0 && (
                                        <>
                                            {index === 0 && section.heading && (
                                                <h3 className="text-[length:var(--resume-heading-size)] font-bold text-gray-800 uppercase tracking-wider border-b-[0.2cqw] border-gray-300 pb-[length:var(--resume-item-gap)] font-resume-header mb-[length:calc(var(--resume-item-gap)*1.5)]">
                                                    {section.heading}
                                                </h3>
                                            )}
                                            <div className="flex justify-between items-baseline gap-[length:var(--resume-item-gap)]">
                                                <h4 className="text-[length:var(--resume-item-title-size)] font-semibold text-gray-900 font-resume-header">
                                                    {item.primary}
                                                </h4>
                                                {(item.date ||
                                                    item.location ||
                                                    (item.links && item.links.length > 0) ||
                                                    item.liveUrl ||
                                                    item.githubUrl ||
                                                    item.link) && (
                                                    <div className="text-[length:var(--resume-body-size)] text-gray-500 font-medium text-right shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
                                                        {item.location && (
                                                            <span>{item.location}</span>
                                                        )}
                                                        {item.location && item.date && (
                                                            <span>|</span>
                                                        )}
                                                        {item.date && <span>{item.date}</span>}

                                                        {(() => {
                                                            const allLinks = [
                                                                ...(item.links || []),
                                                            ];
                                                            if (item.githubUrl)
                                                                allLinks.push({
                                                                    label: "GitHub",
                                                                    url: item.githubUrl,
                                                                });
                                                            if (item.liveUrl)
                                                                allLinks.push({
                                                                    label: "Live",
                                                                    url: item.liveUrl,
                                                                });
                                                            if (item.link && !item.liveUrl)
                                                                allLinks.push({
                                                                    label: "Link",
                                                                    url: item.link,
                                                                });

                                                            if (allLinks.length === 0) return null;

                                                            return (
                                                                <React.Fragment>
                                                                    {(item.location ||
                                                                        item.date) && (
                                                                        <span>|</span>
                                                                    )}
                                                                    {allLinks.map((l, i) => (
                                                                        <React.Fragment key={i}>
                                                                            <a
                                                                                href={l.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-700 print:text-blue-700"
                                                                            >
                                                                                {l.label || "Link"}
                                                                            </a>
                                                                            {i <
                                                                                allLinks.length -
                                                                                    1 && (
                                                                                <span>|</span>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </React.Fragment>
                                                            );
                                                        })()}
                                                    </div>
                                                )}
                                            </div>
                                            {item.secondary && (
                                                <h5 className="text-[length:var(--resume-item-subtitle-size)] font-medium text-gray-600 italic font-resume-header">
                                                    {item.secondary}
                                                </h5>
                                            )}
                                        </>
                                    )}
                                    {chunk && (
                                        <div className={chunkIndex === 0 ? "mt-[length:calc(var(--resume-item-gap)*0.5)]" : ""}>
                                            <ContentBlock content={chunk} />
                                        </div>
                                    )}
                                </div>
                            </PageBreakable>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default TimelineRenderer;

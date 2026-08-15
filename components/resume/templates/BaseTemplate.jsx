import React from "react";
import GenericSection from "../GenericSection";
import PageBreakable from "../ui/PageBreakable";

const BaseTemplate = ({ data }) => {
    const { basics, sections } = data;

    return (
        <div className="px-[length:var(--resume-margin)] py-[6.5cqw] flex flex-col gap-[length:var(--resume-section-gap)] font-resume-body bg-white text-gray-800">
            <PageBreakable id="resume-basics">
                <div
                    className={`flex flex-col gap-[length:var(--resume-item-gap)] ${
                        basics.alignment === "left"
                            ? "items-start text-left"
                            : basics.alignment === "right"
                              ? "items-end text-right"
                              : "items-center text-center"
                    }`}
                >
                    <h1 className="text-[length:var(--resume-title-size)] font-bold leading-tight text-gray-900 font-resume-header">
                        {basics.name}
                    </h1>
                    <h2 className="text-[length:var(--resume-subtitle-size)] font-medium text-gray-600 font-resume-header">
                        {basics.title}
                    </h2>
                    {(() => {
                        const contactItems = [];

                        if (basics.email)
                            contactItems.push(
                                <a
                                    href={`mailto:${basics.email}`}
                                    className="text-blue-700 print:text-blue-700"
                                >
                                    {basics.email}
                                </a>,
                            );
                        if (basics.phone)
                            contactItems.push(
                                <a
                                    href={`tel:${basics.phone}`}
                                    className="text-blue-700 print:text-blue-700"
                                >
                                    {basics.phone}
                                </a>,
                            );
                        if (basics.links && basics.links.length > 0) {
                            basics.links.forEach((link, i) => {
                                if (link.label && link.url) {
                                    contactItems.push(
                                        <a
                                            key={`link-${i}`}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 print:text-blue-700"
                                        >
                                            {link.label}
                                        </a>,
                                    );
                                }
                            });
                        }
                        if (basics.location)
                            contactItems.push(<span>{basics.location}</span>);

                        if (contactItems.length === 0) return null;

                        return (
                            <div
                                className={`flex flex-wrap items-center gap-x-[length:calc(var(--resume-item-gap)*1.5)] gap-y-[length:var(--resume-item-gap)] text-[length:var(--resume-body-size)] text-gray-500 mt-[length:calc(var(--resume-item-gap)/2)] ${
                                    basics.alignment === "left"
                                        ? "justify-start"
                                        : basics.alignment === "right"
                                          ? "justify-end"
                                          : "justify-center"
                                }`}
                            >
                                {contactItems.map((item, i) => (
                                    <React.Fragment key={i}>
                                        {item}
                                        {i < contactItems.length - 1 && (
                                            <span className="text-gray-400">
                                                —
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </PageBreakable>

            <div className="flex flex-col gap-[length:calc(var(--resume-section-gap)*1.14)]">
                {sections.map((section, index) => (
                    <GenericSection
                        key={section.id || index}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
};

export default BaseTemplate;

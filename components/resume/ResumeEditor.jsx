import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BasicsEditor from "./editor/BasicsEditor";
import SectionEditor from "./editor/SectionEditor";
import DesignEditor from "./editor/DesignEditor";
import { Button } from "@/components/ui/button";
import {
    User,
    Briefcase,
    GraduationCap,
    Award,
    FolderGit2,
    Plus,
    Trash2,
    Palette,
} from "lucide-react";

const getSectionIcon = (section) => {
    if (!section || !section.heading) return <Briefcase className="w-4 h-4" />;
    const heading = section.heading.toLowerCase();
    if (heading.includes("experience") || heading.includes("work"))
        return <Briefcase className="w-4 h-4" />;
    if (heading.includes("education"))
        return <GraduationCap className="w-4 h-4" />;
    if (heading.includes("skill")) return <Award className="w-4 h-4" />;
    if (heading.includes("project")) return <FolderGit2 className="w-4 h-4" />;
    return <Briefcase className="w-4 h-4" />;
};

const ResumeEditor = ({ data, onChange }) => {
    const [activeSectionId, setActiveSectionId] = useState("basics");

    const handleBasicsChange = (newBasics) => {
        onChange({ ...data, basics: newBasics });
    };

    const handleDesignChange = (newDesign) => {
        onChange({ ...data, design: newDesign });
    };

    const handleSectionChange = (index, newSection) => {
        const newSections = [...data.sections];
        newSections[index] = newSection;
        onChange({ ...data, sections: newSections });
    };

    const addSection = () => {
        const newSection = {
            id: Date.now().toString(),
            heading: `New Section`,
            type: "text",
            content: "",
        };
        onChange({ ...data, sections: [...data.sections, newSection] });
        setActiveSectionId(newSection.id);
    };

    const deleteSection = (index) => {
        const newSections = data.sections.filter((_, i) => i !== index);
        onChange({ ...data, sections: newSections });
        setActiveSectionId("basics");
    };

    const activeSectionIndex = data.sections.findIndex(
        (s) => s.id === activeSectionId || s.heading === activeSectionId,
    );
    const activeSection = data.sections[activeSectionIndex];

    return (
        <div className="flex flex-col flex-1 min-h-0 w-full pt-4 sm:pt-8">
            <div className="px-4 sm:px-6 mb-3 sm:mb-4 shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                    Resume Data
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    Edit your resume details below. Changes reflect instantly.
                </p>
            </div>
            <div className="w-full overflow-y-auto min-h-0 flex-1">
                <div className="flex flex-col min-h-max bg-transparent pb-16">
                    <div className="flex flex-col pt-2 sm:pt-4">
                        <button
                            onClick={() => setActiveSectionId("basics")}
                            className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors border-l-2
              ${
                  activeSectionId === "basics"
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
              }`}
                        >
                            <User className="w-4 h-4" />
                            Personal Info
                        </button>

                        <div className="mx-4 sm:mx-6 my-2 h-px bg-gray-100" />
                        <div className="px-4 sm:px-6 py-1.5 text-xs font-label uppercase tracking-widest text-gray-400">Settings</div>

                        <button
                            onClick={() => setActiveSectionId("design")}
                            className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors border-l-2
              ${
                  activeSectionId === "design"
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
              }`}
                        >
                            <Palette className="w-4 h-4" />
                            Design
                        </button>

                        <div className="mx-4 sm:mx-6 my-2 h-px bg-gray-100" />
                        <div className="px-4 sm:px-6 py-1.5 text-xs font-label uppercase tracking-widest text-gray-400">Sections</div>

                        {data.sections.map((section) => {
                            const id = section.id || section.heading;
                            const isActive = activeSectionId === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveSectionId(id)}
                                    className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors border-l-2
                  ${
                      isActive
                          ? "border-primary text-primary bg-primary/5"
                          : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                                >
                                    {getSectionIcon(section)}
                                    <span className="truncate">{section.heading || "Untitled Section"}</span>
                                </button>
                            );
                        })}

                        <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100 flex justify-center">
                            <button
                                onClick={addSection}
                                className="flex items-center gap-2 text-[11px] font-label uppercase tracking-[0.05em] text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Add Section
                            </button>
                        </div>
                    </div>

                    <div className="px-4 sm:px-8 pt-6 sm:pt-8">
                        {activeSectionId === "basics" ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                                    Basic Details
                                </h3>
                                <BasicsEditor
                                    basics={data.basics}
                                    onChange={handleBasicsChange}
                                />
                            </div>
                        ) : activeSectionId === "design" ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                    Typography & Style
                                </h3>
                                <DesignEditor
                                    design={data.design}
                                    onChange={handleDesignChange}
                                />
                            </div>
                        ) : activeSection ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {activeSection.heading}
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            deleteSection(activeSectionIndex)
                                        }
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <SectionEditor
                                    section={activeSection}
                                    onChange={(newSec) =>
                                        handleSectionChange(
                                            activeSectionIndex,
                                            newSec,
                                        )
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;

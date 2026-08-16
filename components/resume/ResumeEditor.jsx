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
    GripVertical,
    ChevronUp,
    ChevronDown,
    FileText,
    Wrench,
    Trophy,
    Globe,
    Heart,
    BookOpen,
    Users,
    LayoutList
} from "lucide-react";

const getSectionIcon = (section) => {
    if (!section || !section.heading) return <LayoutList className="w-4 h-4" />;
    
    const heading = section.heading.toLowerCase();
    
    if (heading.includes("summary") || heading.includes("profile") || heading.includes("objective") || heading.includes("about"))
        return <FileText className="w-4 h-4" />;
        
    if (heading.includes("experience") || heading.includes("work") || heading.includes("employment") || heading.includes("history"))
        return <Briefcase className="w-4 h-4" />;
        
    if (heading.includes("education") || heading.includes("academic") || heading.includes("degree"))
        return <GraduationCap className="w-4 h-4" />;
        
    if (heading.includes("skill") || heading.includes("technolog") || heading.includes("expertise") || heading.includes("competencies"))
        return <Wrench className="w-4 h-4" />;
        
    if (heading.includes("project") || heading.includes("portfolio"))
        return <FolderGit2 className="w-4 h-4" />;
        
    if (heading.includes("award") || heading.includes("certification") || heading.includes("achievement") || heading.includes("honor"))
        return <Trophy className="w-4 h-4" />;
        
    if (heading.includes("language"))
        return <Globe className="w-4 h-4" />;
        
    if (heading.includes("interest") || heading.includes("hobb"))
        return <Heart className="w-4 h-4" />;
        
    if (heading.includes("volunteer") || heading.includes("community") || heading.includes("leadership"))
        return <Users className="w-4 h-4" />;
        
    if (heading.includes("publication") || heading.includes("paper") || heading.includes("article"))
        return <BookOpen className="w-4 h-4" />;
        
    // Fallback based on type
    if (section.type === "text") return <FileText className="w-4 h-4" />;
    
    return <LayoutList className="w-4 h-4" />;
};

const ResumeEditor = ({ data, onChange }) => {
    const [activeSectionId, setActiveSectionId] = useState("basics");
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [dropPosition, setDropPosition] = useState(null);

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

    const reorderSections = (fromIndex, toIndex, position) => {
        if (fromIndex === null || toIndex === null || fromIndex === toIndex) return;
        const newSections = [...data.sections];
        const [movedItem] = newSections.splice(fromIndex, 1);
        
        let insertAt = toIndex;
        if (fromIndex < toIndex) {
            insertAt = position === 'top' ? toIndex - 1 : toIndex;
        } else {
            insertAt = position === 'top' ? toIndex : toIndex + 1;
        }
        
        insertAt = Math.max(0, Math.min(newSections.length, insertAt));
        newSections.splice(insertAt, 0, movedItem);
        onChange({ ...data, sections: newSections });
    };

    const moveSection = (fromIndex, toIndex, e) => {
        e?.stopPropagation();
        if (toIndex < 0 || toIndex >= data.sections.length) return;
        const newSections = [...data.sections];
        const [movedItem] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, movedItem);
        onChange({ ...data, sections: newSections });
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (draggedIndex === null || draggedIndex === index) {
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const isTop = (e.clientY - rect.top) < (rect.height / 2);
        const newPos = isTop ? 'top' : 'bottom';
        if (dragOverIndex !== index || dropPosition !== newPos) {
            setDragOverIndex(index);
            setDropPosition(newPos);
        }
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== targetIndex) {
            reorderSections(draggedIndex, targetIndex, dropPosition);
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
        setDropPosition(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
        setDropPosition(null);
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
                    <div 
                        className="flex flex-col pt-2 sm:pt-4"
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                        }}
                    >
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
                        <div className="flex items-center justify-between px-4 sm:px-6 py-1.5">
                            <span className="text-xs font-label uppercase tracking-widest text-gray-400">Sections</span>
                            <span className="text-[10px] font-mono text-gray-400 select-none">Drag to reorder</span>
                        </div>

                        {data.sections.map((section, index) => {
                            const id = section.id || section.heading;
                            const isActive = activeSectionId === id;
                            const isDraggingThis = draggedIndex === index;
                            const isOverThis = dragOverIndex === index && draggedIndex !== index;

                            return (
                                <div
                                    key={id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => setActiveSectionId(id)}
                                    className={`group relative flex items-center justify-between px-3 sm:px-5 py-3 text-sm font-medium transition-all duration-150 border-l-2 cursor-default select-none
                                    ${
                                        isActive
                                            ? "border-primary text-primary bg-primary/5"
                                            : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50/70"
                                    }
                                    ${isDraggingThis ? "opacity-30 bg-gray-100 scale-[0.98]" : "opacity-100"}
                                    `}
                                >
                                    {/* Top Drop Indicator Line */}
                                    {isOverThis && dropPosition === "top" && (
                                        <div className="absolute -top-[2px] left-2 right-2 h-[3px] bg-indigo-600 rounded-full z-20 shadow-[0_0_8px_rgba(79,70,229,0.8)] pointer-events-none animate-in fade-in duration-100" />
                                    )}

                                    {/* Bottom Drop Indicator Line */}
                                    {isOverThis && dropPosition === "bottom" && (
                                        <div className="absolute -bottom-[2px] left-2 right-2 h-[3px] bg-indigo-600 rounded-full z-20 shadow-[0_0_8px_rgba(79,70,229,0.8)] pointer-events-none animate-in fade-in duration-100" />
                                    )}

                                    <div className={`flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 ${draggedIndex !== null ? 'pointer-events-none' : ''}`}>
                                        <div
                                            className="p-1 -ml-1 text-gray-300 group-hover:text-gray-500 hover:text-indigo-600 transition-colors rounded"
                                            title="Drag to reorder section"
                                        >
                                            <GripVertical className="w-3.5 h-3.5 shrink-0" />
                                        </div>
                                        <div className="shrink-0 text-gray-500 group-hover:text-gray-700">
                                            {getSectionIcon(section)}
                                        </div>
                                        <span className="truncate text-xs sm:text-sm">
                                            {section.heading || "Untitled Section"}
                                        </span>
                                    </div>

                                    {/* Quick Reorder Up/Down buttons on hover / touch */}
                                    <div className={`flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${draggedIndex !== null ? 'pointer-events-none' : ''}`}>
                                        <button
                                            type="button"
                                            onClick={(e) => moveSection(index, index - 1, e)}
                                            disabled={index === 0}
                                            className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-white rounded transition-colors disabled:opacity-20 disabled:hover:text-gray-400"
                                            title="Move section up"
                                        >
                                            <ChevronUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => moveSection(index, index + 1, e)}
                                            disabled={index === data.sections.length - 1}
                                            className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-white rounded transition-colors disabled:opacity-20 disabled:hover:text-gray-400"
                                            title="Move section down"
                                        >
                                            <ChevronDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
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

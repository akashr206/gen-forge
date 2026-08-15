import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import SectionEditor from './SectionEditor';

const SectionsEditor = ({ sections, onChange }) => {
  const updateSection = (index, newSection) => {
    const newSections = [...sections];
    newSections[index] = newSection;
    onChange(newSections);
  };

  const removeSection = (index) => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      heading: `New ${type} Section`,
      type: type,
      ...(type === 'text' && { content: "" }),
      ...(type === 'timeline' && { items: [] }),
      ...(type === 'tags' && { groups: [] })
    };
    onChange([...sections, newSection]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={section.id || index} value={`section-${index}`} className="border bg-white rounded-md px-3 mb-3">
            <div className="flex items-center justify-between group">
              <AccordionTrigger className="hover:no-underline flex-1 text-sm font-medium">
                {section.heading || 'Untitled Section'} ({section.type})
              </AccordionTrigger>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => { e.preventDefault(); removeSection(index); }}
                className="opacity-0 group-hover:opacity-100 h-8 w-8 text-red-500 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="pt-2 pb-4">
              <SectionEditor section={section} onChange={(newSec) => updateSection(index, newSec)} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-wrap gap-2 mt-2">
        <Button variant="outline" size="sm" onClick={() => addSection('text')}>
          <Plus className="h-4 w-4 mr-2" /> Text Section
        </Button>
        <Button variant="outline" size="sm" onClick={() => addSection('timeline')}>
          <Plus className="h-4 w-4 mr-2" /> Timeline Section
        </Button>
        <Button variant="outline" size="sm" onClick={() => addSection('tags')}>
          <Plus className="h-4 w-4 mr-2" /> Tags Section
        </Button>
      </div>
    </div>
  );
};

export default SectionsEditor;

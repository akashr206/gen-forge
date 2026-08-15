import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MarkdownEditor from './MarkdownEditor';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";

const TimelineEditor = ({ items, onChange }) => {
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, { primary: "New Item", secondary: "", date: "", location: "", content: "" }]);
  };

  return (
    <div className="flex flex-col gap-3">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border bg-gray-50 rounded-md px-3 mb-2">
            <div className="flex items-center justify-between group">
              <AccordionTrigger className="hover:no-underline flex-1 text-sm font-medium">
                {item.primary || 'Untitled'}
              </AccordionTrigger>
              <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); removeItem(index); }} className="opacity-0 group-hover:opacity-100 h-8 w-8 text-red-500 transition-opacity">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="pt-2 pb-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <span className="text-xs font-medium text-gray-500">Primary (Title)</span>
                  <Input value={item.primary || ''} onChange={(e) => updateItem(index, 'primary', e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <span className="text-xs font-medium text-gray-500">Secondary (Company)</span>
                  <Input value={item.secondary || ''} onChange={(e) => updateItem(index, 'secondary', e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <span className="text-xs font-medium text-gray-500">Date</span>
                  <Input value={item.date || ''} onChange={(e) => updateItem(index, 'date', e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <span className="text-xs font-medium text-gray-500">Location</span>
                  <Input value={item.location || ''} onChange={(e) => updateItem(index, 'location', e.target.value)} />
                </div>
              </div>
              <div className="grid gap-1 mt-2">
                <span className="text-xs font-medium text-gray-500">Description</span>
                <MarkdownEditor 
                  value={item.content} 
                  onChange={(val) => updateItem(index, 'content', val)}
                  placeholder="Describe your role..."
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button variant="outline" size="sm" onClick={addItem} className="w-fit">
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>
    </div>
  );
};

export default TimelineEditor;

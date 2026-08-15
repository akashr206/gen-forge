import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
    onChange([...items, { primary: "New Item", secondary: "", date: "", location: "", content: [] }]);
  };

  const handleContentStringChange = (index, text) => {
    const content = text.split('\n').filter(line => line.trim() !== '').map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return { type: 'bullet', text: trimmed.substring(1).trim() };
      }
      return { type: 'paragraph', text: trimmed };
    });
    updateItem(index, 'content', content);
  };

  const getContentString = (contentArray) => {
    if (!contentArray) return "";
    return contentArray.map(c => c.type === 'bullet' ? `- ${c.text}` : c.text).join('\n\n');
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
                <span className="text-xs font-medium text-gray-500">Description (Start with '-' for bullets, separated by newlines)</span>
                <Textarea 
                  value={getContentString(item.content)} 
                  onChange={(e) => handleContentStringChange(index, e.target.value)}
                  rows={4}
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

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MarkdownEditor from './MarkdownEditor';
import TimelineEditor from './TimelineEditor';

const SectionEditor = ({ section, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...section, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label>Section Heading</Label>
        <Input 
          value={section.heading || ''} 
          onChange={(e) => handleChange('heading', e.target.value)} 
        />
      </div>

      <div className="grid gap-2 mt-2">
        <Label>Section Type</Label>
        <div className="flex flex-wrap gap-2">
          {['text', 'timeline'].map((t) => (
            <button
              key={t}
              onClick={() => handleChange('type', t)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors capitalize ${
                section.type === t 
                  ? 'bg-primary text-primary-foreground shadow' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {section.type === 'text' && (
        <div className="grid gap-2 mt-2">
          <Label>Content</Label>
          <MarkdownEditor 
            value={section.content} 
            onChange={(val) => handleChange('content', val)}
            placeholder="Write your section content here..."
          />
        </div>
      )}

      {section.type === 'timeline' && (
        <div className="mt-2">
          <Label className="mb-2 block">Timeline Items</Label>
          <TimelineEditor items={section.items || []} onChange={(items) => handleChange('items', items)} />
        </div>
      )}
    </div>
  );
};

export default SectionEditor;

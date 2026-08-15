import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TimelineEditor from './TimelineEditor';
import TagsEditor from './TagsEditor';

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
          {['text', 'timeline', 'tags'].map((t) => (
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
          <Textarea 
            value={section.content || ''} 
            onChange={(e) => handleChange('content', e.target.value)}
            rows={5}
          />
        </div>
      )}

      {section.type === 'timeline' && (
        <div className="mt-2">
          <Label className="mb-2 block">Timeline Items</Label>
          <TimelineEditor items={section.items || []} onChange={(items) => handleChange('items', items)} />
        </div>
      )}

      {section.type === 'tags' && (
        <div className="mt-2">
          <Label className="mb-2 block">Tag Groups</Label>
          <TagsEditor groups={section.groups || []} onChange={(groups) => handleChange('groups', groups)} />
        </div>
      )}
    </div>
  );
};

export default SectionEditor;

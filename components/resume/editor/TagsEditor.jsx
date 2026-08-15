import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const TagsEditor = ({ groups, onChange }) => {
  const updateGroup = (index, field, value) => {
    const newGroups = [...groups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    onChange(newGroups);
  };

  const removeGroup = (index) => {
    onChange(groups.filter((_, i) => i !== index));
  };

  const addGroup = () => {
    onChange([...groups, { category: "New Category", items: [] }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group, index) => (
        <div key={index} className="flex flex-col gap-2 p-3 border rounded-md bg-gray-50 relative group">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeGroup(index)} 
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 text-red-500 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="grid gap-1 pr-6">
            <span className="text-xs font-medium text-gray-500">Category Name</span>
            <Input value={group.category || ''} onChange={(e) => updateGroup(index, 'category', e.target.value)} />
          </div>
          <div className="grid gap-1">
            <span className="text-xs font-medium text-gray-500">Tags (comma separated)</span>
            <Input 
              value={(group.items || []).join(', ')} 
              onChange={(e) => {
                const arr = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                updateGroup(index, 'items', arr);
              }} 
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addGroup} className="w-fit">
        <Plus className="h-4 w-4 mr-2" /> Add Tag Group
      </Button>
    </div>
  );
};

export default TagsEditor;

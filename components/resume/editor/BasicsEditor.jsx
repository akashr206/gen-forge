import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, Plus, Trash2 } from "lucide-react";

const BasicsEditor = ({ basics, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...basics, [field]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          value={basics.name || ''} 
          onChange={(e) => handleChange('name', e.target.value)} 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input 
          id="title" 
          value={basics.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input 
            value={basics.email || ''} 
            onChange={(e) => handleChange('email', e.target.value)} 
          />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input 
            value={basics.phone || ''} 
            onChange={(e) => handleChange('phone', e.target.value)} 
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Location</Label>
        <Input 
          value={basics.location || ''} 
          onChange={(e) => handleChange('location', e.target.value)} 
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label>Custom Links</Label>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={(e) => { e.preventDefault(); handleChange('links', [...(basics.links || []), { label: '', url: '' }]); }}>
            <Plus className="h-3 w-3 mr-1" /> Add Link
          </Button>
        </div>
        {(basics.links || []).map((link, linkIndex) => (
          <div key={linkIndex} className="flex gap-2 items-start">
            <Input 
              placeholder="Label (e.g. GitHub)" 
              value={link.label} 
              onChange={(e) => {
                const newLinks = [...(basics.links || [])];
                newLinks[linkIndex] = { ...newLinks[linkIndex], label: e.target.value };
                handleChange('links', newLinks);
              }} 
              className="w-1/3" 
            />
            <Input 
              placeholder="URL (https://...)" 
              value={link.url} 
              onChange={(e) => {
                const newLinks = [...(basics.links || [])];
                newLinks[linkIndex] = { ...newLinks[linkIndex], url: e.target.value };
                handleChange('links', newLinks);
              }} 
              className="flex-1" 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.preventDefault();
                const newLinks = [...(basics.links || [])];
                newLinks.splice(linkIndex, 1);
                handleChange('links', newLinks);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

    <div className="grid gap-2">
        <Label>Alignment</Label>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-md w-fit">
          <button
            onClick={() => handleChange('alignment', 'left')}
            className={`p-2 rounded ${basics.alignment === 'left' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleChange('alignment', 'center')}
            className={`p-2 rounded ${(!basics.alignment || basics.alignment === 'center') ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleChange('alignment', 'right')}
            className={`p-2 rounded ${basics.alignment === 'right' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicsEditor;

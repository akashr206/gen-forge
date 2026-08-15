import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

    </div>
  );
};

export default BasicsEditor;

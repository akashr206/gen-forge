import React from 'react';
import { Label } from "@/components/ui/label";

const FONTS = [
  "Latin Modern Sans",
  "Computer Modern",
  "Helvetica",
  "Arial",
  "Roboto",
  "Lato",
  "Source Sans Pro",
  "Fira Sans",
  "Noto Sans",
  "TeX Gyre Heros",
  "TeX Gyre Pagella",
  "EB Garamond",
  "Times New Roman",
];

const DesignEditor = ({ design = {}, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...design, [field]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label>Header Font</Label>
        <select 
          className="h-auto w-full min-w-0 rounded border border-input bg-transparent px-4 py-4 text-[16px] transition-all outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:shadow-[0_0_20px_rgba(79,70,229,0.15)] cursor-pointer"
          value={design.headerFont || "Helvetica"}
          onChange={(e) => handleChange('headerFont', e.target.value)}
        >
          {FONTS.map(font => <option key={font} value={font}>{font}</option>)}
        </select>
      </div>

      <div className="grid gap-2">
        <Label>Body Font</Label>
        <select 
          className="h-auto w-full min-w-0 rounded border border-input bg-transparent px-4 py-4 text-[16px] transition-all outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:shadow-[0_0_20px_rgba(79,70,229,0.15)] cursor-pointer"
          value={design.bodyFont || "Roboto"}
          onChange={(e) => handleChange('bodyFont', e.target.value)}
        >
          {FONTS.map(font => <option key={font} value={font}>{font}</option>)}
        </select>
      </div>
    </div>
  );
};

export default DesignEditor;

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

const NumberControl = ({ label, value, onChange, min, max }) => {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinus = () => {
    if (value > min) {
      setLocalValue(value - 1);
      onChange(value - 1);
    }
  };
  
  const handlePlus = () => {
    if (value < max) {
      setLocalValue(value + 1);
      onChange(value + 1);
    }
  };
  
  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = min;
    const clamped = Math.min(Math.max(val, min), max);
    setLocalValue(clamped);
    onChange(clamped);
  };

  return (
    <div className="flex items-center justify-between">
      <Label className="text-gray-700 font-medium">{label}</Label>
      <div className="flex items-center gap-1.5">
        <button 
          onClick={handleMinus}
          disabled={value <= min}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          -
        </button>
        <div className="relative flex items-center">
          <input 
            type="number"
            min={min} max={max}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-7 w-11 text-center px-2 rounded-md border border-gray-200 bg-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <button 
          onClick={handlePlus}
          disabled={value >= max}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

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

      <div className="grid gap-4 mt-4">
        <h3 className="font-semibold text-lg border-b pb-2">Spacing Settings</h3>
        
        <div className="flex flex-col gap-3 pt-1">
          <NumberControl 
            label="Page Margin" 
            value={design.margin ?? 56} 
            onChange={(val) => handleChange('margin', val)} 
            min={20} max={100} 
          />
          <NumberControl 
            label="Section Gap" 
            value={design.sectionGap ?? 28} 
            onChange={(val) => handleChange('sectionGap', val)} 
            min={10} max={50} 
          />
          <NumberControl 
            label="Item Gap" 
            value={design.itemGap ?? 8} 
            onChange={(val) => handleChange('itemGap', val)} 
            min={2} max={20} 
          />
        </div>
      </div>

      <div className="grid gap-4 mt-4">
        <h3 className="font-semibold text-lg border-b pb-2">Typography Sizes</h3>
        
        <div className="flex flex-col gap-3 pt-1">
          {[
            { key: 'title', label: 'Name (Title)', min: 30, max: 70, default: 52 },
            { key: 'subtitle', label: 'Role (Subtitle)', min: 14, max: 32, default: 22 },
            { key: 'sectionHeader', label: 'Section Header', min: 16, max: 36, default: 24 },
            { key: 'itemTitle', label: 'Item Title', min: 12, max: 24, default: 18 },
            { key: 'itemSubtitle', label: 'Item Subtitle', min: 10, max: 20, default: 16 },
            { key: 'body', label: 'Body Text', min: 10, max: 18, default: 14 }
          ].map(setting => (
            <NumberControl 
              key={setting.key}
              label={setting.label} 
              value={design.fontSizes?.[setting.key] ?? setting.default} 
              onChange={(val) => handleChange('fontSizes', { ...(design.fontSizes || {}), [setting.key]: val })}
              min={setting.min} max={setting.max} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;

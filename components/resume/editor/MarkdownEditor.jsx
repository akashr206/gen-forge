import React, { useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, List } from "lucide-react";

const MarkdownEditor = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);

  const getSafeValue = () => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      return value.map(c => c.type === 'bullet' ? `- ${c.text}` : c.text).join('\n\n');
    }
    return '';
  };

  const safeValue = getSafeValue();

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newText = before + prefix + selection + suffix + after;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="border border-input rounded focus-within:ring-1 focus-within:ring-primary focus-within:border-primary overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-1 p-1.5 border-b border-input bg-gray-50/50">
        <button 
          onClick={(e) => { e.preventDefault(); insertFormatting('**', '**'); }}
          className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors"
          title="Bold"
          type="button"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); insertFormatting('*', '*'); }}
          className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors"
          title="Italic"
          type="button"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button 
          onClick={(e) => { e.preventDefault(); insertFormatting('- '); }}
          className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors"
          title="Bullet List"
          type="button"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
      <Textarea 
        ref={textareaRef}
        value={safeValue} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 rounded-none shadow-none resize-y min-h-[120px] p-3 text-sm"
      />
    </div>
  );
};

export default MarkdownEditor;

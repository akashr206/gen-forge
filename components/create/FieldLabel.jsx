import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function FieldLabel({
  htmlFor,
  children,
  required = false,
  recommended = false,
  className,
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Label
        htmlFor={htmlFor}
        className="font-mono text-[11px] uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none"
      >
        {children}
      </Label>

      {required && (
        <span className="text-red-500 font-bold text-xs select-none" title="Required">
          *
        </span>
      )}

      {recommended && (
        <span className="font-mono text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/70 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 select-none">
          Recommended
        </span>
      )}
    </div>
  );
}

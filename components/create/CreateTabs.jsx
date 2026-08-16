import React from 'react';
import { PenLine, FileUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CreateTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'manual',
      label: 'Enter Manually',
      icon: PenLine,
    },
    {
      id: 'extract',
      label: 'Extract from Resume',
      icon: FileUp,
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Creation method"
      className="grid grid-cols-2 w-full p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 gap-1.5"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer outline-hidden select-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isActive ? "text-primary-foreground" : "text-slate-500"
              )}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

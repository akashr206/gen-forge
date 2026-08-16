import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import FieldLabel from './FieldLabel';

export default function JobDescriptionSection({ jd, onJdChange }) {
  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-2">
      <FieldLabel htmlFor="jd" recommended>
        Target Job Description
      </FieldLabel>
      <Textarea
        id="jd"
        placeholder="Paste target job description to automatically tailor resume summary and bullet points..."
        rows={4}
        className="min-h-25 text-sm leading-relaxed"
        value={jd}
        onChange={(e) => onJdChange(e.target.value)}
      />
    </div>
  );
}

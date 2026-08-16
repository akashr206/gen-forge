import React, { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FieldLabel from './FieldLabel';
import { UploadCloud, CheckCircle2, Trash2, Copy, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResumeExtractorTab({
  pdfFile,
  pdfText,
  isUploading,
  uploadSuccess,
  onPdfUpload,
  onPdfTextChange,
  onClearPdf,
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = pdfText.trim() ? pdfText.trim().split(/\s+/).length : 0;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onPdfUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onPdfUpload(e.target.files[0]);
    }
  };

  const handleCopy = () => {
    if (!pdfText) return;
    navigator.clipboard.writeText(pdfText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Minimal Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex items-center justify-center p-6 border border-dashed rounded-lg cursor-pointer transition-all duration-150 select-none",
          dragActive
            ? "border-primary bg-primary/5"
            : uploadSuccess
            ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/20"
            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />

        {isUploading ? (
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Parsing PDF resume...</span>
          </div>
        ) : uploadSuccess && pdfFile ? (
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                {pdfFile.name}
              </span>
              <span className="text-xs text-slate-400 font-mono">({wordCount} words)</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="font-mono text-[11px] uppercase tracking-wider h-7"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearPdf();
                }}
                className="font-mono text-[11px] uppercase tracking-wider text-red-500 hover:text-red-600 h-7"
              >
                <Trash2 className="w-3 h-3 mr-1" /> Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500">
            <UploadCloud className="w-4 h-4 text-slate-400" />
            <span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Click to upload</span> or drag & drop PDF resume
            </span>
          </div>
        )}
      </div>

      {/* Editable Extracted Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="pdf-text" required>
            Extracted Text
          </FieldLabel>

          <div className="flex items-center gap-3">
            {pdfText && (
              <>
                <span className="text-xs font-mono text-slate-400">{wordCount} words</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={handleCopy}
                  className="font-mono text-[11px] uppercase tracking-wider h-6 px-1.5"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => onPdfTextChange('')}
                  className="font-mono text-[11px] uppercase tracking-wider text-red-500 hover:text-red-600 h-6 px-1.5"
                >
                  Clear
                </Button>
              </>
            )}
          </div>
        </div>

        <Textarea
          id="pdf-text"
          placeholder="Upload a PDF above or paste your raw resume text here to edit..."
          rows={12}
          className="min-h-[260px] font-mono text-xs sm:text-sm leading-relaxed"
          value={pdfText}
          onChange={(e) => onPdfTextChange(e.target.value)}
        />
      </div>
    </div>
  );
}

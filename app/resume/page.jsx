"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeViewer from '@/components/resume/ResumeViewer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import initialData from '@/data/sample-resume.json';
import Navbar from '@/components/layout/Navbar';
import { Loader2, CheckCircle2, Edit3, Eye } from 'lucide-react';

const ResumePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [editorData, setEditorData] = useState(initialData);
  const [resumeData, setResumeData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!!id);
  const [saveStatus, setSaveStatus] = useState('');
  const [mobileTab, setMobileTab] = useState('editor');
  const lastSavedJson = React.useRef('');

  useEffect(() => {
    if (id) {
      fetch(`/api/resumes/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.resume) {
            const merged = { ...initialData, ...data.resume };
            setEditorData(merged);
            setResumeData(merged);
            lastSavedJson.current = JSON.stringify({
              title: merged.title,
              basics: merged.basics,
              sections: merged.sections,
              design: merged.design
            });
          }
        })
        .catch(err => console.error("Failed to load resume:", err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setResumeData(editorData);
    }, 500);
    return () => clearTimeout(handler);
  }, [editorData]);

  useEffect(() => {
    if (!id || !lastSavedJson.current) return;

    const currentJson = JSON.stringify({
      title: editorData.title,
      basics: editorData.basics,
      sections: editorData.sections,
      design: editorData.design
    });

    if (currentJson === lastSavedJson.current) {
      return;
    }

    setSaveStatus('saving');
    
    const handler = setTimeout(() => {
      fetch(`/api/resumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: currentJson
      })
      .then(res => {
        if (res.ok) {
          lastSavedJson.current = currentJson;
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus(''), 2500);
        } else {
          setSaveStatus('');
        }
      })
      .catch(err => {
        console.error("Auto-save failed:", err);
        setSaveStatus('');
      });
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [editorData, id]);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden print:h-auto print:overflow-visible print:block">
      <Navbar 
        title={editorData?.title ?? ""}
        onTitleChange={(newTitle) => setEditorData(prev => ({ ...prev, title: newTitle }))}
      />

      <div className="lg:hidden flex items-center justify-center p-2 bg-slate-100/90 border-b border-gray-200 shrink-0 print:hidden z-20">
        <div className="flex bg-white rounded p-1 border border-gray-200/80 shadow-2xs w-full max-w-xs">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition-all ${
              mobileTab === 'editor'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition-all ${
              mobileTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <main className="flex-1 w-full flex overflow-hidden print:overflow-visible print:h-auto print:block relative">
          {saveStatus && (
            <div className="absolute top-3 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-gray-200/90 rounded shadow-xs text-xs font-medium text-gray-700 print:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saved</span>
                </>
              )}
            </div>
          )}
          
          <div className={`w-full lg:w-115 xl:w-125 shrink-0 h-full border-r border-[#E2E8F0] bg-white/70 backdrop-blur-md flex flex-col z-10 print:hidden! ${
            mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
          }`}>
            <ResumeEditor data={editorData} onChange={setEditorData} />
          </div>

          <div className={`flex-1 h-full relative print:block! print:h-auto! print:w-auto! print:overflow-visible! ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}>
            <ResumeViewer data={resumeData} />
          </div>
        </main>
      )}
    </div>
  );
};

export default ResumePage;

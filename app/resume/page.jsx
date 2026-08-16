"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeViewer from '@/components/resume/ResumeViewer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import initialData from '@/data/sample-resume.json';
import Navbar from '@/components/layout/Navbar';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ResumePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [editorData, setEditorData] = useState(initialData);
  const [resumeData, setResumeData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!!id);
  const [saveStatus, setSaveStatus] = useState('');
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/resumes/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.resume) {
            const merged = { ...initialData, ...data.resume };
            setEditorData(merged);
            setResumeData(merged);
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSaveStatus('saving');
    
    const handler = setTimeout(() => {
      if (id && editorData._id === id) {
        fetch(`/api/resumes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editorData.title,
            basics: editorData.basics,
            sections: editorData.sections,
            design: editorData.design
          })
        })
        .then(res => {
          if (res.ok) {
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
      } else {
        setSaveStatus('');
      }
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
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <main className="flex-1 w-full flex overflow-hidden print:overflow-visible print:h-auto print:block relative">
          {saveStatus && (
            <div className="absolute top-4 right-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-md shadow-sm text-xs font-medium text-gray-600 print:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  Saved
                </>
              )}
            </div>
          )}
          
          <div className="w-1/2 max-w-[500px] shrink-0 h-full border-r border-[#E2E8F0] bg-white/70 backdrop-blur-md flex flex-col z-10 print:hidden">
            <ResumeEditor data={editorData} onChange={setEditorData} />
          </div>

          <div className="flex-1 h-full relative print:block print:h-auto print:w-auto print:overflow-visible">
            <ResumeViewer data={resumeData} />
          </div>
        </main>
      )}
    </div>
  );
};

export default ResumePage;

"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeViewer from '@/components/resume/ResumeViewer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import initialData from '@/data/sample-resume.json';

import Navbar from '@/components/layout/Navbar';

const ResumePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [editorData, setEditorData] = useState(initialData);
  const [resumeData, setResumeData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetch(`/api/resumes/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.resume) {
            // Merge with initial data to ensure all keys exist
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

      // Auto-save logic
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
        }).catch(err => console.error("Auto-save failed:", err));
      }
    }, 1000); // Debounce save by 1s

    return () => {
      clearTimeout(handler);
    };
  }, [editorData, id]);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden print:h-auto print:overflow-visible print:block">
      <Navbar />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <main className="flex-1 w-full flex overflow-hidden print:overflow-visible print:h-auto print:block">
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

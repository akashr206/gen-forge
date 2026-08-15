"use client"

import React, { useState } from 'react';
import ResumeViewer from '@/components/resume/ResumeViewer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import initialData from '@/data/sample-resume.json';

import Navbar from '@/components/layout/Navbar';

const ResumePage = () => {
  const [editorData, setEditorData] = useState(initialData);
  const [resumeData, setResumeData] = useState(initialData);

  React.useEffect(() => {
    // Check if there is a generated resume in session storage
    const generated = sessionStorage.getItem('generatedResume');
    if (generated) {
      try {
        const parsed = JSON.parse(generated);
        // Merge the AI generated content with the default design parameters
        const mergedData = {
          ...parsed,
          design: initialData.design
        };
        setEditorData(mergedData);
        setResumeData(mergedData);
        // Clear it so it doesn't stay indefinitely
        sessionStorage.removeItem('generatedResume');
      } catch (err) {
        console.error("Failed to parse generated resume from session storage", err);
      }
    }
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setResumeData(editorData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [editorData]);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden print:h-auto print:overflow-visible print:block">
      <Navbar />
      <main className="flex-1 w-full flex overflow-hidden print:overflow-visible print:h-auto print:block">
        <div className="w-1/2 max-w-[500px] shrink-0 h-full border-r border-[#E2E8F0] bg-white/70 backdrop-blur-md flex flex-col z-10 print:hidden">
          <ResumeEditor data={editorData} onChange={setEditorData} />
        </div>

        <div className="flex-1 h-full relative print:block print:h-auto print:w-auto print:overflow-visible">
          <ResumeViewer data={resumeData} />
        </div>
      </main>
    </div>
  );
};

export default ResumePage;

"use client"

import React, { useState } from 'react';
import ResumeViewer from '@/components/resume/ResumeViewer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import initialData from '@/data/sample-resume.json';

const ResumePage = () => {
  const [editorData, setEditorData] = useState(initialData);
  const [resumeData, setResumeData] = useState(initialData);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setResumeData(editorData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [editorData]);

  return (
    <main className="h-screen w-full flex overflow-hidden bg-background">
      <div className="w-1/2 max-w-[500px] shrink-0 h-full border-r border-[#E2E8F0] bg-white/70 backdrop-blur-md flex flex-col z-10">
        <ResumeEditor data={editorData} onChange={setEditorData} />
      </div>

      <div className="flex-1 h-full relative">
        <ResumeViewer data={resumeData} />
      </div>
    </main>
  );
};

export default ResumePage;

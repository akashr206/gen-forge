"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { parsePartialJson } from '@/lib/utils';
import LiveResumePreview from '@/components/resume/LiveResumePreview';
import initialData from '@/data/sample-resume.json';

import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import CreateTabs from '@/components/create/CreateTabs';
import ManualEntryForm from '@/components/create/ManualEntryForm';
import ResumeExtractorTab from '@/components/create/ResumeExtractorTab';
import JobDescriptionSection from '@/components/create/JobDescriptionSection';
import ResumeGuideModal from '@/components/create/ResumeGuideModal';

export default function CreateResumePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('manual');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    skills: '',
    projects: '',
    links: [],
    customSections: [],
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [jd, setJd] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState(null);
  const [parsedObject, setParsedObject] = useState({});
  const scrollRef = useRef(null);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  useEffect(() => {
    if (isGenerating && scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          const content = scrollRef.current.querySelector('.font-resume-body');
          if (content) {
            const contentRect = content.getBoundingClientRect();
            const scrollRect = scrollRef.current.getBoundingClientRect();
            const contentBottomRelative = contentRect.bottom - scrollRect.top + scrollRef.current.scrollTop;
            const targetScrollTop = contentBottomRelative - scrollRect.height + 100;

            if (targetScrollTop > 0) {
              scrollRef.current.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth',
              });
            }
          }
        }
      });
    }
  }, [parsedObject, isGenerating]);

  useEffect(() => {
    if (isGenerating) {
      const t1 = setTimeout(() => setGenerationProgress(1), 2000);
      const t2 = setTimeout(() => setGenerationProgress(2), 5000);
      const t3 = setTimeout(() => setGenerationProgress(3), 8000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        setGenerationProgress(0);
      };
    }
  }, [isGenerating]);

  const handlePdfUpload = async (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError({ message: 'Please upload a valid PDF file.' });
      return;
    }

    setPdfFile(file);
    setIsUploading(true);
    setUploadSuccess(false);
    setError(null);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: data,
      });

      const resData = await res.json();
      if (res.ok && resData.text) {
        setPdfText(resData.text);
        setUploadSuccess(true);
      } else {
        setError({ message: resData.error || 'Failed to extract text from PDF.' });
      }
    } catch (err) {
      console.error('PDF upload error:', err);
      setError({ message: 'An error occurred while parsing the PDF.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearPdf = () => {
    setPdfFile(null);
    setPdfText('');
    setUploadSuccess(false);
  };

  const compileManualDetails = (data) => {
    const { name, title, email, phone, location, experience, education, skills, projects, links, customSections } = data;
    const parts = [];

    if (name) parts.push(`Name: ${name}`);
    if (title) parts.push(`Title: ${title}`);
    if (email) parts.push(`Email: ${email}`);
    if (phone) parts.push(`Phone: ${phone}`);
    if (location) parts.push(`Location: ${location}`);

    if (links && links.length > 0) {
      const validLinks = links
        .filter((l) => l.label?.trim() || l.url?.trim())
        .map((l) => `${l.label || 'Link'}: ${l.url}`)
        .join(', ');
      if (validLinks) parts.push(`Links: ${validLinks}`);
    }

    if (experience?.trim()) {
      parts.push(`\nExperience:\n${experience.trim()}`);
    }

    if (education?.trim()) {
      parts.push(`\nEducation:\n${education.trim()}`);
    }

    if (skills?.trim()) {
      parts.push(`\nSkills:\n${skills.trim()}`);
    }

    if (projects?.trim()) {
      parts.push(`\nProjects:\n${projects.trim()}`);
    }

    if (customSections && customSections.length > 0) {
      customSections.forEach((sec) => {
        if (sec.title?.trim() && sec.content?.trim()) {
          parts.push(`\n${sec.title.trim()}:\n${sec.content.trim()}`);
        }
      });
    }

    return parts.join('\n');
  };

  const submit = async (payload) => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError({ message: errorData.error || 'Failed to start resume generation.' });
        setIsGenerating(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedJSON = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
              try {
                const streamData = JSON.parse(line.slice(6));
                if (streamData.choices?.[0]?.delta?.content) {
                  accumulatedJSON += streamData.choices[0].delta.content;
                  const partial = parsePartialJson(accumulatedJSON);
                  if (partial) {
                    setParsedObject(partial);
                  }
                }
              } catch (e) {}
            }
          }
        }
      }

      try {
        const resultObject = JSON.parse(accumulatedJSON);

        const saveRes = await fetch('/api/resumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: resultObject.basics?.name ? `${resultObject.basics.name}'s Resume` : 'AI Generated Resume',
            basics: resultObject.basics,
            sections: resultObject.sections,
            design: initialData.design,
          }),
        });

        if (!saveRes.ok) {
          throw new Error('Failed to save generated resume to database');
        }

        const { resume } = await saveRes.json();
        router.push(`/resume?id=${resume._id}`);
      } catch (e) {
        console.error('Failed to parse accumulated JSON:', e);
        setError({ message: 'The AI generated an invalid resume format. Please try again.' });
        setIsGenerating(false);
      }
    } catch (err) {
      console.error('Error during generation:', err);
      setError({ message: err.message || 'An error occurred during resume generation.' });
      setIsGenerating(false);
    }
  };

  const handleBuild = () => {
    setError(null);

    if (activeTab === 'manual') {
      if (!formData.name.trim()) {
        setError({ message: 'Please enter your Full Name.' });
        return;
      }
      if (!formData.title.trim()) {
        setError({ message: 'Please enter your Target Role.' });
        return;
      }
      if (!formData.email.trim()) {
        setError({ message: 'Please enter your Email Address.' });
        return;
      }
      if (
        !formData.experience.trim() &&
        !formData.skills.trim() &&
        !formData.projects.trim() &&
        !formData.education.trim() &&
        !(formData.customSections || []).some((sec) => sec.title?.trim() && sec.content?.trim())
      ) {
        setError({
          message: 'Please provide at least some details (such as Experience, Skills, Projects, Education, or Custom Sections).',
        });
        return;
      }

      const combinedDetails = compileManualDetails(formData);
      submit({ details: combinedDetails, jd });
    } else {
      if (!pdfText.trim()) {
        setError({ message: 'Please upload a PDF or enter resume text.' });
        return;
      }

      submit({ pdfText: pdfText.trim(), jd });
    }
  };

  if (isGenerating) {
    const livePreviewData = {
      ...initialData,
      ...parsedObject,
      basics: {
        ...initialData.basics,
        ...(parsedObject.basics || {}),
      },
      sections: parsedObject.sections || [],
      design: initialData.design,
    };

    return (
      <div className="flex flex-col h-screen w-full overflow-hidden relative bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply animate-pulse"></div>
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/20 blur-[120px] mix-blend-multiply animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <Navbar />

        <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 pt-3 pb-6 sm:pt-4 sm:pb-8 overflow-hidden px-2 sm:px-4">
          <div className="flex flex-col items-center mb-4 sm:mb-6 text-slate-800 text-center space-y-1 sm:space-y-2 px-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse mb-1" />
            <h1 className="text-xl sm:text-2xl font-light tracking-wide">Generating Resume</h1>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md">
              Structuring your experience and tailoring content in real-time...
            </p>
          </div>

          <div
            ref={scrollRef}
            className="relative flex-1 w-full flex justify-center overflow-y-auto overflow-x-hidden pt-2 sm:pt-4 pb-16"
          >
            <div className="transform scale-[0.42] xs:scale-[0.50] sm:scale-[0.65] md:scale-[0.80] xl:scale-90 origin-top transition-all duration-500 ease-in-out">
              <div className="shadow-2xl shadow-indigo-500/10 ring-1 ring-black/5 bg-white pointer-events-none rounded-xl overflow-hidden">
                <LiveResumePreview
                  data={livePreviewData}
                  showSkeleton={Object.keys(parsedObject).length === 0}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Create Resume
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enter your details manually or extract from an existing resume.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>ATS & Data Entry Guide</span>
          </button>
        </div>

        <div className="mb-6">
          <CreateTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="space-y-6">
          {activeTab === 'manual' ? (
            <ManualEntryForm formData={formData} onFieldChange={handleFieldChange} />
          ) : (
            <ResumeExtractorTab
              pdfFile={pdfFile}
              pdfText={pdfText}
              isUploading={isUploading}
              uploadSuccess={uploadSuccess}
              onPdfUpload={handlePdfUpload}
              onPdfTextChange={(val) => {
                setPdfText(val);
                if (error) setError(null);
              }}
              onClearPdf={handleClearPdf}
            />
          )}

          <JobDescriptionSection jd={jd} onJdChange={setJd} />

          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error.message}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 pb-16">
            <span className="text-xs text-slate-400">
              * Required fields
            </span>

            <Button
              size="lg"
              className="px-6 h-10 rounded-md text-xs sm:text-sm font-medium shadow-xs hover:shadow-sm transition-all cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleBuild}
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Generate Resume
            </Button>
          </div>
        </div>
      </main>

      <ResumeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

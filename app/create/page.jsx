"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';

const linkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

const timelineItemSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  date: z.string(),
  location: z.string().optional(),
  content: z.string(),
  links: z.array(linkSchema).optional(),
});

const textSectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  type: z.literal("text"),
  content: z.string(),
});

const timelineSectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  type: z.literal("timeline"),
  items: z.array(timelineItemSchema),
});

const resumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    alignment: z.enum(["left", "center", "right"]).default("center"),
    links: z.array(linkSchema).default([]),
  }),
  sections: z.array(
    z.discriminatedUnion("type", [textSectionSchema, timelineSectionSchema])
  ),
});

export default function CreateResumePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [links, setLinks] = useState('');
  const [projects, setProjects] = useState('');
  const [jd, setJd] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isGenerating) {
      const t1 = setTimeout(() => setGenerationProgress(1), 2000);
      const t2 = setTimeout(() => setGenerationProgress(2), 5000);
      const t3 = setTimeout(() => setGenerationProgress(3), 8000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); setGenerationProgress(0); };
    }
  }, [isGenerating]);

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
        setError({ message: 'Failed to start generation' });
        setIsGenerating(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedJSON = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.choices?.[0]?.delta?.content) {
                  accumulatedJSON += data.choices[0].delta.content;
                }
              } catch (e) {
                // Ignore parse errors for partial lines
              }
            }
          }
        }
      }

      try {
        const resultObject = JSON.parse(accumulatedJSON);
        sessionStorage.setItem('generatedResume', JSON.stringify(resultObject));
        router.push('/resume');
      } catch (e) {
        console.error("Failed to parse accumulated JSON:", e);
        console.log("Raw output:", accumulatedJSON);
        setError({ message: "The AI generated invalid JSON. Please try again." });
        setIsGenerating(false);
      }
    } catch (err) {
      console.error("Error during generation:", err);
      setError({ message: err.message || "An error occurred during generation." });
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }

    setPdfFile(file);
    setIsUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setPdfText(data.text);
        setUploadSuccess(true);
      } else {
        alert('Failed to extract text from PDF.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBuild = () => {
    const combinedDetails = `
Name: ${name}
Title: ${title}
Experience:
${experience}
Skills:
${skills}
Links:
${links}
Projects:
${projects}
    `.trim();

    if (!name && !title && !experience && !skills && !pdfText) {
      alert('Please provide some details or upload an existing resume to get started.');
      return;
    }
    setIsGenerating(true);
    submit({ details: combinedDetails, jd, pdfText });
  };

  // Magical Loading State UI
  if (isGenerating) {
    const isBasicsDone = generationProgress >= 1;
    const isExperienceDone = generationProgress >= 2;
    const isEducationDone = generationProgress >= 3;

    return (
      <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-slate-50/50">
          <div className="flex flex-col items-center gap-8 max-w-md text-center">
            <div className="relative flex items-center justify-center w-24 h-24">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-blue-100 rounded-full animate-pulse"></div>
              <Sparkles className="w-10 h-10 text-blue-600 animate-pulse relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-tight">Crafting Your Resume</h1>
              <p className="text-slate-500">Our AI is analyzing your details and formatting the perfect layout.</p>
            </div>

            <div className="w-full max-w-sm space-y-4 text-left mt-8">
              <div className="flex items-center gap-3 text-slate-700">
                {isBasicsDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />}
                <span className={isBasicsDone ? "text-slate-500 line-through" : "font-medium"}>Extracting Personal Information</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                {isExperienceDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <div className={isBasicsDone ? "w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" : "w-5 h-5 rounded-full border-2 border-slate-200"} />}
                <span className={isExperienceDone ? "text-slate-500 line-through" : isBasicsDone ? "font-medium" : "text-slate-400"}>Highlighting Key Experience</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                {isEducationDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <div className={isExperienceDone ? "w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" : "w-5 h-5 rounded-full border-2 border-slate-200"} />}
                <span className={isEducationDone ? "text-slate-500 line-through" : isExperienceDone ? "font-medium" : "text-slate-400"}>Structuring Education & Skills</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50/50">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-light tracking-tight mb-3">Create Your Resume</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Provide your details below, or upload an existing resume to get a head start. Our AI will perfectly format and tailor it to your target role.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Upload Section */}
          <Card className="border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Quick Start: Upload Resume</CardTitle>
              <CardDescription>Already have a resume? Upload a PDF to automatically fill in your experience and education.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors ${uploadSuccess ? 'border-green-300 bg-green-50/30' : 'border-slate-200'}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    ) : uploadSuccess ? (
                      <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
                    ) : (
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
                    )}
                    
                    <p className="mb-2 text-sm text-slate-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              {uploadSuccess && (
                <p className="text-sm text-green-600 mt-3 text-center font-medium">Successfully extracted {pdfText.split(' ').length} words from PDF.</p>
              )}
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card className="border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Manual Details</CardTitle>
              <CardDescription>Fill in your personal information, experience, and skills below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-slate-50/50" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Target Job Title</Label>
                  <Input id="title" placeholder="Frontend Developer" className="bg-slate-50/50" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea id="experience" placeholder="Where have you worked? Briefly list your roles and achievements..." className="min-h-[100px] resize-y bg-slate-50/50" value={experience} onChange={(e) => setExperience(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea id="skills" placeholder="List your key technical and soft skills..." className="min-h-[80px] resize-y bg-slate-50/50" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projects">Projects <span className="text-slate-400 font-normal">(Optional)</span></Label>
                  <Textarea id="projects" placeholder="Notable projects you've built..." className="min-h-[80px] resize-y bg-slate-50/50" value={projects} onChange={(e) => setProjects(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="links">Links <span className="text-slate-400 font-normal">(Optional)</span></Label>
                  <Textarea id="links" placeholder="LinkedIn, GitHub, Portfolio URL..." className="min-h-[80px] resize-y bg-slate-50/50" value={links} onChange={(e) => setLinks(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JD Section */}
          <Card className="border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Target Role <span className="text-slate-400 text-sm font-normal ml-2">(Optional)</span></CardTitle>
              <CardDescription>Paste the job description you are applying for. The AI will tailor your resume to highlight relevant keywords.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jd">Job Description</Label>
                <Textarea 
                  id="jd" 
                  placeholder="Paste job description here..." 
                  className="min-h-[150px] resize-y bg-slate-50/50"
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              An error occurred during generation: {error.message}
            </div>
          )}

          <div className="flex justify-end pt-4 pb-20">
            <Button size="lg" className="px-8 h-12 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all" onClick={handleBuild}>
              <Sparkles className="w-5 h-5 mr-2" />
              Build Magic Resume
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

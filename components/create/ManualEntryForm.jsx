import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FieldLabel from './FieldLabel';
import { Plus, Trash2, Layers } from 'lucide-react';

export default function ManualEntryForm({ formData, onFieldChange }) {
  const {
    name = '',
    title = '',
    email = '',
    phone = '',
    location = '',
    experience = '',
    education = '',
    skills = '',
    projects = '',
    links = [],
    customSections = [],
  } = formData;

  const handleAddLink = () => {
    onFieldChange('links', [...links, { label: '', url: '' }]);
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    onFieldChange('links', updated);
  };

  const handleRemoveLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    onFieldChange('links', updated);
  };

  const handleAddSection = () => {
    onFieldChange('customSections', [
      ...customSections,
      { id: Date.now().toString(), title: '', content: '' },
    ]);
  };

  const handleCustomSectionChange = (index, field, value) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    onFieldChange('customSections', updated);
  };

  const handleRemoveSection = (index) => {
    const updated = customSections.filter((_, i) => i !== index);
    onFieldChange('customSections', updated);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-7">
      {/* Personal & Contact Details */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="name" required>
              Full Name
            </FieldLabel>
            <Input
              id="name"
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => onFieldChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="title" required>
              Target Role
            </FieldLabel>
            <Input
              id="title"
              placeholder="Senior Software Engineer"
              value={title}
              onChange={(e) => onFieldChange('title', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="email" required>
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => onFieldChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="phone">
              Phone
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 019-2834"
              value={phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="location">
              Location
            </FieldLabel>
            <Input
              id="location"
              placeholder="San Francisco, CA or Remote"
              value={location}
              onChange={(e) => onFieldChange('location', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <FieldLabel htmlFor="experience" recommended>
          Work Experience
        </FieldLabel>
        <Textarea
          id="experience"
          placeholder="Company, role, dates, achievements, and key metrics..."
          rows={5}
          className="min-h-[130px] text-sm leading-relaxed"
          value={experience}
          onChange={(e) => onFieldChange('experience', e.target.value)}
        />
      </div>

      {/* Education */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <FieldLabel htmlFor="education" recommended>
          Education
        </FieldLabel>
        <Textarea
          id="education"
          placeholder="Degree, university/school, graduation year, GPA or honors..."
          rows={2}
          className="min-h-[72px] text-sm"
          value={education}
          onChange={(e) => onFieldChange('education', e.target.value)}
        />
      </div>

      {/* Skills */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <FieldLabel htmlFor="skills" recommended>
          Skills
        </FieldLabel>
        <Textarea
          id="skills"
          placeholder="e.g. TypeScript, React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker..."
          rows={2}
          className="min-h-[72px] text-sm"
          value={skills}
          onChange={(e) => onFieldChange('skills', e.target.value)}
        />
      </div>

      {/* Projects */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <FieldLabel htmlFor="projects" recommended>
          Projects
        </FieldLabel>
        <Textarea
          id="projects"
          placeholder="Project name, description, tech stack, and key results..."
          rows={2}
          className="min-h-[72px] text-sm"
          value={projects}
          onChange={(e) => onFieldChange('projects', e.target.value)}
        />
      </div>

      {/* Custom Links */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between">
          <FieldLabel>Custom Links</FieldLabel>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleAddLink}
            className="font-mono text-[11px] uppercase tracking-wider text-slate-600 hover:text-slate-900 cursor-pointer h-7"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Link
          </Button>
        </div>

        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1/3 min-w-[100px]">
                  <Input
                    placeholder="GitHub / LinkedIn"
                    value={link.label || ''}
                    onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
                    className="text-xs sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="https://..."
                    value={link.url || ''}
                    onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                    className="text-xs sm:text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleRemoveLink(idx)}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer shrink-0"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Custom Sections */}
      {customSections.length > 0 && (
        <div className="space-y-6 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {customSections.map((section, idx) => (
            <div key={section.id || idx} className="space-y-3 p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 relative group">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 max-w-sm">
                  <Input
                    placeholder="Section Title (e.g. Certifications, Awards, Volunteering)"
                    value={section.title || ''}
                    onChange={(e) => handleCustomSectionChange(idx, 'title', e.target.value)}
                    className="bg-white dark:bg-slate-900 font-medium text-xs sm:text-sm h-9"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => handleRemoveSection(idx)}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer h-8"
                  title="Remove Section"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Remove
                </Button>
              </div>

              <Textarea
                placeholder="Description or bullet points for this section..."
                rows={3}
                className="bg-white dark:bg-slate-900 min-h-[80px] text-sm"
                value={section.content || ''}
                onChange={(e) => handleCustomSectionChange(idx, 'content', e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Section Button */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-center sm:justify-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddSection}
          className="gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer h-8"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom Section
        </Button>
      </div>
    </div>
  );
}

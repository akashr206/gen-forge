import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req) {
  try {
    const { details, jd, pdfText } = await req.json();

    if (!process.env.MIMO_API_KEY) {
      return NextResponse.json(
        { error: 'MIMO_API_KEY is not configured in the environment variables.' },
        { status: 500 }
      );
    }

    let prompt = `You are an elite executive resume writer and ATS (Applicant Tracking System) optimization expert. Your task is to generate a highly professional, structurally flawless resume in JSON format.
    
Here are the raw details provided by the user:
${details ? `User Notes: ${details}\n` : ''}
${pdfText ? `Extracted Text from Existing Resume:\n${pdfText}\n` : ''}
${jd ? `Target Job Description (Tailor the resume to this):\n${jd}\n` : ''}

STRICT INSTRUCTIONS & STANDARDS:

1. PERSONAL INFO (basics):
   - Extract name, title, email, phone, and location.
   - Extract relevant links (LinkedIn, GitHub, Portfolio). Each link MUST have a 'label' (e.g., 'GitHub', 'Portfolio') and a valid 'url'.
   
2. PROFESSIONAL SUMMARY (text section, id: "summary"):
   - Write EXACTLY 3 to 4 sentences for a compelling, ATS-optimized paragraph highlighting the candidate's unique value proposition, core expertise, and career trajectory.

3. EXPERIENCE (timeline section, id: "experience"):
   - Map roles to timeline items: 'primary' (Role/Title), 'secondary' (Company), 'date' (e.g., "Jan 2020 - Present"), 'location'.
   - CRITICAL MARKDOWN RULE: The 'content' field MUST use standard Markdown unordered lists. You MUST use a hyphen and a space ('- ') for each bullet point.
   - DO NOT use hardcoded unicode bullets (•, ◦, ▪).
   - Start every bullet point with a strong action verb (e.g., "Architected", "Engineered", "Spearheaded").
   - STRUCTURE BULLETS USING THE X-Y-Z FORMULA: "Accomplished [X], as measured by [Y], by doing [Z]". Always frame achievements to highlight the measurable business impact.
   - Quantify achievements with metrics, percentages, and data wherever possible.
   - BOLD key metrics, important technologies, and core achievements within each bullet point using markdown (e.g., "**40% latency reduction**" or "**React.js**").
   - Separate each bullet point with a newline character (\\n).
   
   Example of valid Markdown for 'content':
   - Engineered a scalable microservices architecture using **Node.js**, reducing latency by **40%**.\\n- Mentored a team of 5 junior developers, improving code delivery speed by **25%**.

4. EDUCATION (timeline section, id: "education"):
   - 'primary' (Degree), 'secondary' (Institution), 'date', 'location'. Add GPA or honors in 'content' if notable.

5. TECHNICAL SKILLS (text section, id: "skills"):
   - Group skills logically. Format the category name in bold, followed by a colon, and comma-separated skills.
   - Example: **Languages:** JavaScript, Python, C++\\n**Frameworks:** React, Node.js, Next.js

6. PROJECTS (timeline section, id: "projects"):
   - If applicable, format similarly to Experience. Include technologies used and measurable impact.

7. ATS TAILORING:
   - If a Job Description is provided, seamlessly weave the target keywords and required skills into the summary and experience bullets without keyword stuffing.

Return ONLY a valid JSON object matching exactly this structure:
{
  "basics": {
    "name": "...", "title": "...", "email": "...", "phone": "...", "location": "...", "alignment": "center", "links": [{ "label": "...", "url": "..." }]
  },
  "sections": [
    { "type": "text", "id": "...", "heading": "...", "content": "..." },
    { "type": "timeline", "id": "...", "heading": "...", "items": [{ "primary": "...", "secondary": "...", "date": "...", "location": "...", "content": "..." }] }
  ]
}`;

    const response = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MIMO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mimo-v2.5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" },
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("MIMO API Error:", err);
      return NextResponse.json({ error: 'Failed to generate resume from AI' }, { status: response.status });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}

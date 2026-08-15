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

    let prompt = `You are an expert technical resume writer. Your task is to generate a highly professional, beautifully structured resume in JSON format.
    
Here are the raw details provided by the user:
${details ? `User Notes: ${details}\n` : ''}
${pdfText ? `Extracted Text from Existing Resume:\n${pdfText}\n` : ''}
${jd ? `Target Job Description (Tailor the resume to this):\n${jd}\n` : ''}

Instructions:
1. Extract and format the personal information (name, title, email, phone, location, links). Links should have 'label' and 'url'.
2. Create a compelling "Professional Summary" (text section, id: "summary").
3. Create an "Experience" section (timeline section, id: "experience"). Focus on achievements and metrics. Use markdown bullet points in the content. Timeline items have: primary, secondary, date, location, content.
4. Create an "Education" section (timeline section, id: "education").
5. Create a "Technical Skills" section (text section, id: "skills"). Format categories in bold (e.g., **Languages:** JavaScript).
6. Create any other relevant sections like "Projects" if data is available.
7. Ensure all content is professional, ATS-friendly, and perfectly grammatically correct.
8. If the user provided a Job Description, tailor the summary and experience bullet points to highlight relevant skills.

Return ONLY a valid JSON object matching this structure:
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

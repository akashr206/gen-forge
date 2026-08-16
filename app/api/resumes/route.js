import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import sampleData from "@/data/sample-resume.json";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const resumes = await Resume.find({ userId: session.user.id }).sort({
      updatedAt: -1,
    });

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("GET /api/resumes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json().catch(() => ({}));
    const title = body.title || "Untitled Resume";

    const resumeCount = await Resume.countDocuments({ userId: session.user.id });
    if (resumeCount >= 10) {
      return NextResponse.json(
        { error: "Maximum limit of 10 resumes reached" },
        { status: 403 }
      );
    }

    const newResume = await Resume.create({
      userId: session.user.id,
      title,
      design: body.design || sampleData.design,
      basics: body.basics || sampleData.basics,
      sections: body.sections || sampleData.sections,
    });

    return NextResponse.json({ resume: newResume }, { status: 201 });
  } catch (error) {
    console.error("POST /api/resumes error:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}

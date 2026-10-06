import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, topic, language } = body || {};

    if (!title || !topic) {
      return NextResponse.json({ error: 'title and topic are required' }, { status: 400 });
    }

    return NextResponse.json({
      id: 'project-demo-001',
      title: String(title),
      topic: String(topic),
      language: language || 'en',
      status: 'draft',
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    projects: [],
  });
}

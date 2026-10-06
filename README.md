import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const topic = body?.topic || 'General research topic';

    return NextResponse.json({
      projectId: params.id,
      status: 'accepted',
      topic,
      summary: 'Research pipeline is initialized. Add provider orchestration next.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Research pipeline failed' }, { status: 500 });
  }
}

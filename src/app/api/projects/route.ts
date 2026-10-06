import { NextRequest, NextResponse } from 'next/server';
import { ProjectService, CreateProjectInput } from '@/services/project.service';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, topic, language }: CreateProjectInput = body;

    // TODO: Get userId from session
    const userId = 'test-user';

    const service = new ProjectService();
    const project = await service.createProject({
      userId,
      title,
      topic,
      language,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    logger.error('POST /api/projects failed', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session
    const userId = 'test-user';

    const service = new ProjectService();
    const projects = await service.getUserProjects(userId);

    return NextResponse.json(projects);
  } catch (error) {
    logger.error('GET /api/projects failed', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

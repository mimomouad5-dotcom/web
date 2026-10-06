import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export interface CreateProjectInput {
  userId: string;
  title: string;
  topic: string;
  language: 'en' | 'ar' | 'fr';
}

export class ProjectService {
  async createProject(input: CreateProjectInput) {
    try {
      const project = await prisma.project.create({
        data: {
          userId: input.userId,
          title: input.title,
          topic: input.topic,
          language: input.language,
          status: 'draft',
        },
      });

      // Create initial version
      await prisma.projectVersion.create({
        data: {
          projectId: project.id,
          version: 1,
          status: 'draft',
        },
      });

      logger.info('Project created', { projectId: project.id });
      return project;
    } catch (error) {
      logger.error('Failed to create project', error);
      throw error;
    }
  }

  async getProject(projectId: string) {
    return prisma.project.findUnique({
      where: { id: projectId },
      include: {
        versions: { orderBy: { version: 'desc' }, take: 1 },
      },
    });
  }

  async getUserProjects(userId: string) {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        versions: { orderBy: { version: 'desc' }, take: 1 },
      },
    });
  }

  async updateProjectStatus(projectId: string, status: string) {
    return prisma.project.update({
      where: { id: projectId },
      data: { status },
    });
  }
}

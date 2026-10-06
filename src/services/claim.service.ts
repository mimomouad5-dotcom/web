import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export interface CreateClaimInput {
  projectVersionId: string;
  text: string;
  confidence?: number;
}

export class ClaimService {
  async createClaim(input: CreateClaimInput) {
    try {
      const claim = await prisma.claim.create({
        data: {
          projectVersionId: input.projectVersionId,
          text: input.text,
          confidence: input.confidence || 0.5,
        },
      });
      return claim;
    } catch (error) {
      logger.error('Failed to create claim', error);
      throw error;
    }
  }

  async linkEvidence(claimId: string, sourceId: string, strength: number = 0.8) {
    try {
      const evidence = await prisma.claimEvidence.create({
        data: {
          claimId,
          sourceId,
          strength,
        },
      });
      return evidence;
    } catch (error) {
      logger.error('Failed to link evidence', error);
      throw error;
    }
  }

  async getClaims(projectVersionId: string) {
    return prisma.claim.findMany({
      where: { projectVersionId },
      include: {
        evidence: {
          include: { source: true },
        },
      },
    });
  }
}

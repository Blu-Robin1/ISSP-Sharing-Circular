import type { Project } from '../../shared/models/library';
import type { ProjectStage } from '../../shared/models/projectSupport';

export interface ProjectStageThresholds {
  stage2Supporters: number;
  stage3Supporters: number;
  stage4Supporters: number;
}

const DEFAULT_THRESHOLDS: ProjectStageThresholds = {
  stage2Supporters: 5,
  stage3Supporters: 15,
  stage4Supporters: 40,
};

export function computeEffectiveStage(
  params: {
    stage?: number | null;
    stageOverride?: number | null;
    supporterCount: number;
    memberCount: number;
    championCount: number;
    volunteerCount: number;
    donateCount: number;
    moderation?: string;
  },
  thresholds: ProjectStageThresholds = DEFAULT_THRESHOLDS,
): ProjectStage {
  // Admin override wins
  if (params.stageOverride) return params.stageOverride as ProjectStage;

  // If moderation is pending/rejected, stay at stage 1
  if (params.moderation && params.moderation !== 'accepted') return 1;

  // Use supporter count for stage calculation
  const supporterCount = params.supporterCount || 0;

  if (supporterCount >= thresholds.stage4Supporters) return 4;
  if (supporterCount >= thresholds.stage3Supporters) return 3;
  if (supporterCount >= thresholds.stage2Supporters) return 2;
  return 1;
}

export function getStageLabel(stage: ProjectStage): string {
  switch (stage) {
    case 1:
      return 'Planning';
    case 2:
      return 'Community Backing';
    case 3:
      return 'Admin Deliberation';
    case 4:
      return 'Launched';
    default:
      return 'Planning';
  }
}

export function getStageDescription(stage: ProjectStage): string {
  switch (stage) {
    case 1:
      return 'This project is in the planning phase. Join as a supporter to help it grow!';
    case 2:
      return 'This project has community backing and is building momentum with supporters.';
    case 3:
      return 'This project is under admin deliberation as it moves toward launch readiness.';
    case 4:
      return 'This project has launched and is ready for broader community participation.';
    default:
      return 'This project is in the planning phase.';
  }
}

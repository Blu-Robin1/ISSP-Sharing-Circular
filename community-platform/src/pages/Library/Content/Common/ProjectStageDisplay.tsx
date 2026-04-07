import { Badge, Flex, Text } from 'theme-ui';
import { computeEffectiveStage, getStageLabel } from '../../../../utils/projectStageLogic';

interface ProjectStageDisplayProps {
  stage: number | null;
  stageOverride: number | null;
  supporterCount: number;
  memberCount: number;
  championCount: number;
  volunteerCount: number;
  donateCount: number;
  moderation?: string;
}

export const ProjectStageDisplay = ({
  stage,
  stageOverride,
  supporterCount,
  memberCount,
  championCount,
  volunteerCount,
  donateCount,
  moderation,
}: ProjectStageDisplayProps) => {
  const effectiveStage = computeEffectiveStage({
    stage,
    stageOverride,
    supporterCount,
    memberCount,
    championCount,
    volunteerCount,
    donateCount,
    moderation,
  });

  const stageLabel = getStageLabel(effectiveStage);
  const isOverridden = stageOverride !== null && stageOverride !== stage;

  return (
    <Flex sx={{ alignItems: 'center', gap: 2 }}>
      <Badge
        variant={effectiveStage === 4 ? 'success' : effectiveStage === 3 ? 'warning' : 'muted'}
        sx={{ fontSize: 1 }}
      >
        Stage {effectiveStage}: {stageLabel}
      </Badge>
      {isOverridden && (
        <Text sx={{ fontSize: 0, color: 'text.secondary' }}>
          (overridden)
        </Text>
      )}
    </Flex>
  );
};
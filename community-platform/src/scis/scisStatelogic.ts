import type { ScisInitiative, ScisStage } from "./scisTypes";

export interface StageThresholds {
  stage2Supporters: number;
  stage3Supporters: number;
  stage4Supporters: number;
}

const DEFAULT_THRESHOLDS: StageThresholds = {
  stage2Supporters: 5,
  stage3Supporters: 15,
  stage4Supporters: 40,
};

function uniqueSupporterKey(a: { userId?: string; displayName?: string }) {
  // In demos without auth, displayName is the best we can do.
  // Fall back to a stable placeholder to avoid NaN logic.
  if (a.userId) return `u:${a.userId}`;
  if (a.displayName) return `n:${a.displayName.trim().toLowerCase()}`;
  return "anon";
}

export function computeEffectiveStage(
  initiative: ScisInitiative,
  thresholds: StageThresholds = DEFAULT_THRESHOLDS,
): ScisStage {
  // Admin override wins (demo-safe, intentional)
  if (initiative.stageOverride) return initiative.stageOverride;

  // If moderation is pending/rejected, you can decide to freeze stage.
  // Recommendation: pending stays at stage 1; rejected stays at stage 1 (but hidden from main map).
  if (initiative.moderation !== "approved") return 1;

  const uniqueSupporters = new Set(
    initiative.supportActions.map((a) => uniqueSupporterKey(a)),
  );

  const count = uniqueSupporters.size;

  if (count >= thresholds.stage4Supporters) return 4;
  if (count >= thresholds.stage3Supporters) return 3;
  if (count >= thresholds.stage2Supporters) return 2;
  return 1;
}
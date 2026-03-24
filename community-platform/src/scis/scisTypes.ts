export type ScisStage = 1 | 2 | 3 | 4;

export type ScisSupportActionType =
  | "add_my_name"
  | "volunteer_skills"
  | "pledge_membership"
  | "donate"
  | "champion";

export interface ScisSupportActionBase {
  id: string;
  initiativeId: string;
  type: ScisSupportActionType;
  createdAt: string; // ISO
  // If you have logged-in users, you can populate these; otherwise optional.
  userId?: string;
  displayName?: string;
}

export interface ScisSupportAddMyName extends ScisSupportActionBase {
  type: "add_my_name";
}

export interface ScisSupportVolunteerSkills extends ScisSupportActionBase {
  type: "volunteer_skills";
  skills: string[]; // normalized list
  note?: string;
}

export interface ScisSupportPledgeMembership extends ScisSupportActionBase {
  type: "pledge_membership";
  membershipType?: string; // e.g. "monthly", "annual", "founding"
  note?: string;
}

export interface ScisSupportDonate extends ScisSupportActionBase {
  type: "donate";
  amount?: number; // store what user entered; real payments later
  currency?: string;
  note?: string;
}

export interface ScisSupportChampion extends ScisSupportActionBase {
  type: "champion";
  note?: string;
}

export type ScisSupportAction =
  | ScisSupportAddMyName
  | ScisSupportVolunteerSkills
  | ScisSupportPledgeMembership
  | ScisSupportDonate
  | ScisSupportChampion;

export type ScisModerationStatus = "pending" | "approved" | "rejected";

export interface ScisInitiative {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;

  // “source stage” may come from mock service; “effective stage” is computed/overridden.
  stage: ScisStage;

  createdAt: string; // ISO
  createdByUserId?: string;
  createdByName?: string;

  moderation: ScisModerationStatus;

  // Admin can override stage for demo safety / moderation decisions
  stageOverride?: ScisStage;

  // Support actions (local) – keep separate from server model for future DB
  supportActions: ScisSupportAction[];
}
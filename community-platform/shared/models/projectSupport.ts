export type ProjectStage = 1 | 2 | 3 | 4;

export type ProjectSupportActionType =
  | "add_my_name"
  | "volunteer_skills"
  | "pledge_membership"
  | "donate"
  | "champion";

export interface ProjectSupportActionBase {
  id: string;
  projectId: number;
  type: ProjectSupportActionType;
  createdAt: string; // ISO
  userId?: string;
  displayName?: string;
  email?: string;
}

export interface ProjectSupportAddMyName extends ProjectSupportActionBase {
  type: "add_my_name";
}

export interface ProjectSupportVolunteerSkills extends ProjectSupportActionBase {
  type: "volunteer_skills";
  skills: string[];
  note?: string;
}

export interface ProjectSupportPledgeMembership extends ProjectSupportActionBase {
  type: "pledge_membership";
  membershipType?: string;
  note?: string;
}

export interface ProjectSupportDonate extends ProjectSupportActionBase {
  type: "donate";
  amount?: number;
  currency?: string;
  note?: string;
}

export interface ProjectSupportChampion extends ProjectSupportActionBase {
  type: "champion";
  note?: string;
}

export type ProjectSupportAction =
  | ProjectSupportAddMyName
  | ProjectSupportVolunteerSkills
  | ProjectSupportPledgeMembership
  | ProjectSupportDonate
  | ProjectSupportChampion;
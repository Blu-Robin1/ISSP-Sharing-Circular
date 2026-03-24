// scis.store.ts
export type ScisSupportActionType =
  | 'add_my_name'
  | 'volunteer_skills'
  | 'pledge_membership'
  | 'donate'
  | 'champion';

export type ScisModerationStatus = 'pending' | 'approved' | 'rejected';
export type ScisStage = 1 | 2 | 3 | 4;

export interface ScisSupportAction {
  id: string;
  initiativeId: string;
  type: ScisSupportActionType;
  createdAt: string;
  displayName?: string;
  email?: string;
  postalCode?: string;
  note?: string;
  skills?: string[];
  membershipType?: string;
  amount?: number;
  currency?: string;
}

export type ScisProjectType = 'tool_library' | 'repair_cafe' | 'skill_share' | 'workspace' | 'other';

export interface ScisLocalInitiative {
  id: string; // raw id (no "initiative-" prefix)
  title: string;
  description: string;
  projectType?: ScisProjectType;
  lat: number;
  lng: number;
  createdAt: string;
  moderation: ScisModerationStatus; // pending by default
  stageOverride?: ScisStage;
}

export interface ScisStage3Milestones {
  budget?: string;
  projectPlanUrl?: string;
  insurance?: boolean;
  renovationScope?: string;
  launchDate?: string;
  committeeUpdates?: string[];
  fundraisingLaunched?: boolean;
}

export interface ScisInitiativeLocalState {
  // per-initiative local state (keyed by initiativeId)
  supportActions?: ScisSupportAction[];
  stageOverride?: ScisStage;
  moderation?: ScisModerationStatus;
  stage3Milestones?: ScisStage3Milestones;
}

type ScisStorageShape = {
  initiatives: Record<string, ScisLocalInitiative>;
  state: Record<string, ScisInitiativeLocalState>;
};

const STORAGE_KEY = 'scis_local_v1';

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const nowIso = () => new Date().toISOString();
const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`;

function loadAll(): ScisStorageShape {
  if (!canUseStorage()) return { initiatives: {}, state: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { initiatives: {}, state: {} };
    const parsed = JSON.parse(raw) as ScisStorageShape;
    if (!parsed || typeof parsed !== 'object') return { initiatives: {}, state: {} };

    return {
      initiatives: parsed.initiatives && typeof parsed.initiatives === 'object' ? parsed.initiatives : {},
      state: parsed.state && typeof parsed.state === 'object' ? parsed.state : {},
    };
  } catch {
    return { initiatives: {}, state: {} };
  }
}

function saveAll(data: ScisStorageShape) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('scis_store_updated'));
}

/** Strict: only add_my_name with email AND postalCode count (proposal requirement) */
function strictSupporterCount(actions: ScisSupportAction[]): number {
  const addMyName = actions.filter(
    (a) => a.type === 'add_my_name' && a.email?.trim() && a.postalCode?.trim(),
  );
  const set = new Set(addMyName.map((a) => `e:${a.email!.trim().toLowerCase()}`));
  return set.size;
}

function uniqueSupporterCount(actions: ScisSupportAction[]): number {
  const addMyNameActions = actions.filter((a) => a.type === 'add_my_name');
  const set = new Set(
    addMyNameActions.map((a) => {
      if (a.email) return `e:${a.email.trim().toLowerCase()}`;
      if (a.displayName) return `n:${a.displayName.trim().toLowerCase()}`;
      return `anon_${a.id}`;
    }),
  );
  return set.size;
}

function countByType(actions: ScisSupportAction[], type: ScisSupportAction['type']): number {
  return actions.filter((a) => a.type === type).length;
}

/** Unique count for membership/champion by email; fallback to id if no email */
function uniqueCountByEmail(
  actions: ScisSupportAction[],
  type: 'pledge_membership' | 'champion',
): number {
  const filtered = actions.filter((a) => a.type === type);
  const set = new Set(
    filtered.map((a) => {
      if (a.email?.trim()) return `e:${a.email.trim().toLowerCase()}`;
      return `id:${a.id}`;
    }),
  );
  return set.size;
}

// Proposal thresholds
const STAGE1_TO_2_SUPPORTERS = 50;
const STAGE2_TO_3_SUPPORTERS = 300;
const STAGE2_TO_3_MEMBERS = 100;
const STAGE2_TO_3_CHAMPIONS = 5;

export function computeEffectiveStage(
  baseStage: number,
  local: ScisInitiativeLocalState | undefined,
  serverCounts?: { supporters?: number; members?: number; champions?: number },
): ScisStage {
  if (local?.stageOverride) return local.stageOverride;

  const actions = local?.supportActions ?? [];
  const supportersStrict = strictSupporterCount(actions);
  const membersStrict = uniqueCountByEmail(actions, 'pledge_membership');
  const championsStrict = uniqueCountByEmail(actions, 'champion');

  const supporters = (serverCounts?.supporters ?? 0) + supportersStrict;
  const members = (serverCounts?.members ?? 0) + membersStrict;
  const champions = (serverCounts?.champions ?? 0) + championsStrict;

  const floor = Math.min(Math.max(Number(baseStage || 1), 1), 4);

  // Stage 3 -> 4: admin-controlled (fundraisingLaunched)
  if (local?.stage3Milestones?.fundraisingLaunched && floor >= 3) {
    return 4;
  }

  // Stage 2 -> 3: requires 300 supporters, 100 members, 5 champions
  if (floor >= 2 && supporters >= STAGE2_TO_3_SUPPORTERS && members >= STAGE2_TO_3_MEMBERS && champions >= STAGE2_TO_3_CHAMPIONS) {
    return 3;
  }

  // Stage 1 -> 2: requires 50 strict supporters
  if (floor >= 1 && supporters >= STAGE1_TO_2_SUPPORTERS) {
    return 2;
  }

  return floor as ScisStage;
}

export const scisStore = {
  // --- initiatives (client-first submissions) ---
  listLocalInitiatives(): ScisLocalInitiative[] {
    const all = loadAll();
    return Object.values(all.initiatives).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },

  createLocalInitiative(input: {
    title: string;
    description: string;
    projectType?: ScisProjectType;
    lat: number;
    lng: number;
  }) {
    const all = loadAll();
    const id = uid('local');

    const initiative: ScisLocalInitiative = {
      id,
      title: input.title.trim() || 'Untitled initiative',
      description: input.description.trim() || '',
      projectType: input.projectType ?? 'other',
      lat: Number(input.lat),
      lng: Number(input.lng),
      createdAt: nowIso(),
      moderation: 'pending',
    };

    all.initiatives[id] = initiative;
    // ensure state record exists
    all.state[id] = all.state[id] ?? { moderation: 'pending', supportActions: [] };

    saveAll(all);
    return initiative;
  },

  setModeration(initiativeId: string, moderation: ScisModerationStatus) {
    const all = loadAll();
    if (all.initiatives[initiativeId]) {
      all.initiatives[initiativeId] = { ...all.initiatives[initiativeId], moderation };
    }
    all.state[initiativeId] = { ...(all.state[initiativeId] ?? {}), moderation };
    saveAll(all);
  },

  setStageOverride(initiativeId: string, stageOverride?: ScisStage) {
    const all = loadAll();
    all.state[initiativeId] = { ...(all.state[initiativeId] ?? {}), stageOverride };
    saveAll(all);
  },

  deleteLocalInitiative(initiativeId: string) {
    const all = loadAll();
    delete all.initiatives[initiativeId];
    delete all.state[initiativeId];
    saveAll(all);
  },

  // --- per-initiative local state (support actions etc.) ---
  getLocalState(initiativeId: string): ScisInitiativeLocalState | undefined {
    const all = loadAll();
    return all.state[initiativeId];
  },

  getSupportActions(initiativeId: string): ScisSupportAction[] {
    return this.getLocalState(initiativeId)?.supportActions ?? [];
  },

  getSupporterCount(initiativeId: string, fallback = 0): number {
    const actions = this.getSupportActions(initiativeId);
    if (!actions.length) return fallback;
    return uniqueSupporterCount(actions);
  },

  /** Strict: only add_my_name with email + postalCode count (Stage 1 proposal requirement) */
  getSupporterCountStrict(initiativeId: string, serverFallback = 0): number {
    const actions = this.getSupportActions(initiativeId);
    return serverFallback + strictSupporterCount(actions);
  },

  getUniqueMembershipCount(initiativeId: string, serverFallback = 0): number {
    const actions = this.getSupportActions(initiativeId);
    return serverFallback + uniqueCountByEmail(actions, 'pledge_membership');
  },

  getUniqueChampionCount(initiativeId: string, serverFallback = 0): number {
    const actions = this.getSupportActions(initiativeId);
    return serverFallback + uniqueCountByEmail(actions, 'champion');
  },

  getStageReadinessState(initiativeId: string): ScisStage3Milestones | undefined {
    const state = this.getLocalState(initiativeId);
    return state?.stage3Milestones;
  },

  setStageReadinessState(initiativeId: string, payload: Partial<ScisStage3Milestones>) {
    const all = loadAll();
    const existing = all.state[initiativeId] ?? {};
    all.state[initiativeId] = {
      ...existing,
      stage3Milestones: { ...(existing.stage3Milestones ?? {}), ...payload },
    };
    saveAll(all);
  },

  setFundraisingLaunched(initiativeId: string, value: boolean) {
    this.setStageReadinessState(initiativeId, { fundraisingLaunched: value });
  },

  updateLocalInitiative(
    initiativeId: string,
    updates: { title?: string; description?: string; projectType?: ScisProjectType },
  ) {
    const all = loadAll();
    const initiative = all.initiatives[initiativeId];
    if (!initiative) return;
    if (updates.title !== undefined) initiative.title = updates.title.trim() || initiative.title;
    if (updates.description !== undefined) initiative.description = updates.description ?? initiative.description;
    if (updates.projectType !== undefined) initiative.projectType = updates.projectType;
    all.initiatives[initiativeId] = { ...initiative };
    saveAll(all);
  },

  addSupportAction(input: {
    initiativeId: string;
    type: ScisSupportActionType;
    displayName?: string;
    email?: string;
    postalCode?: string;
    note?: string;
    skills?: string[];
    membershipType?: string;
    amount?: number;
    currency?: string;
  }) {
    const all = loadAll();
    const existingState = all.state[input.initiativeId] ?? {};

    const next: ScisSupportAction = {
      id: uid('support'),
      initiativeId: input.initiativeId,
      type: input.type,
      createdAt: nowIso(),
      displayName: input.displayName?.trim() || undefined,
      email: input.email?.trim() || undefined,
      postalCode: input.postalCode?.trim() || undefined,
      note: input.note?.trim() || undefined,
      skills: input.skills?.map((s) => s.trim()).filter(Boolean),
      membershipType: input.membershipType?.trim() || undefined,
      amount: typeof input.amount === 'number' ? input.amount : undefined,
      currency: input.currency?.trim() || undefined,
    };

    const currentActions = existingState.supportActions ?? [];
    all.state[input.initiativeId] = {
      ...existingState,
      supportActions: [next, ...currentActions],
    };

    saveAll(all);
    return next;
  },

  getCountByType(initiativeId: string, type: ScisSupportAction['type']): number {
    const actions = this.getSupportActions(initiativeId);
    return countByType(actions, type);
  },

  subscribe(cb: () => void) {
    if (typeof window === 'undefined') return () => {};

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) cb();
    };
    const onCustom = () => cb();

    window.addEventListener('storage', onStorage);
    window.addEventListener('scis_store_updated', onCustom as EventListener);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('scis_store_updated', onCustom as EventListener);
    };
  },
};
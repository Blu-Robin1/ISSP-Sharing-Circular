import type {
  ScisInitiative,
  ScisModerationStatus,
  ScisStage,
  ScisSupportAction,
  ScisSupportActionType,
} from "./scisTypes";

const STORAGE_KEY = "scis_initiatives_v1";

// SSR-safe guard
function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function nowIso() {
  return new Date().toISOString();
}

function uid(prefix: string) {
  // Good enough for client-first; replace with server IDs later.
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function loadAll(): ScisInitiative[] {
  if (!canUseBrowserStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScisInitiative[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveAll(items: ScisInitiative[]) {
  if (!canUseBrowserStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // Notify same-tab listeners
  window.dispatchEvent(new CustomEvent("scis_store_updated"));
}

export interface CreateInitiativeInput {
  title: string;
  description: string;
  lat: number;
  lng: number;
  createdByUserId?: string;
  createdByName?: string;
}

export interface AddSupportInput {
  initiativeId: string;
  type: ScisSupportActionType;
  userId?: string;
  displayName?: string;

  // type-specific
  skills?: string[];
  note?: string;
  membershipType?: string;
  amount?: number;
  currency?: string;
}

export interface ScisStore {
  list(): ScisInitiative[];
  get(id: string): ScisInitiative | undefined;

  create(input: CreateInitiativeInput): ScisInitiative;
  setModeration(id: string, status: ScisModerationStatus): ScisInitiative | undefined;

  setStageOverride(id: string, stageOverride?: ScisStage): ScisInitiative | undefined;
  addSupport(input: AddSupportInput): ScisInitiative | undefined;

  remove(id: string): void;

  // subscriptions (same-tab + cross-tab)
  subscribe(cb: () => void): () => void;
}

export function createLocalScisStore(): ScisStore {
  return {
    list() {
      return loadAll();
    },
    get(id) {
      return loadAll().find((x) => x.id === id);
    },
    create(input) {
      const items = loadAll();
      const initiative: ScisInitiative = {
        id: uid("scis"),
        title: input.title.trim(),
        description: input.description.trim(),
        lat: input.lat,
        lng: input.lng,
        stage: 1, // initial; effective stage computed elsewhere
        createdAt: nowIso(),
        createdByUserId: input.createdByUserId,
        createdByName: input.createdByName,
        moderation: "pending",
        supportActions: [],
      };
      items.unshift(initiative);
      saveAll(items);
      return initiative;
    },
    setModeration(id, status) {
      const items = loadAll();
      const idx = items.findIndex((x) => x.id === id);
      if (idx < 0) return undefined;
      items[idx] = { ...items[idx], moderation: status };
      saveAll(items);
      return items[idx];
    },
    setStageOverride(id, stageOverride) {
      const items = loadAll();
      const idx = items.findIndex((x) => x.id === id);
      if (idx < 0) return undefined;
      items[idx] = { ...items[idx], stageOverride };
      saveAll(items);
      return items[idx];
    },
    addSupport(input) {
      const items = loadAll();
      const idx = items.findIndex((x) => x.id === input.initiativeId);
      if (idx < 0) return undefined;

      const base = {
        id: uid("support"),
        initiativeId: input.initiativeId,
        type: input.type,
        createdAt: nowIso(),
        userId: input.userId,
        displayName: input.displayName?.trim() || undefined,
      } as const;

      let action: ScisSupportAction;

      switch (input.type) {
        case "add_my_name":
          action = { ...base, type: "add_my_name" };
          break;
        case "volunteer_skills":
          action = {
            ...base,
            type: "volunteer_skills",
            skills: (input.skills ?? [])
              .map((s) => s.trim())
              .filter(Boolean),
            note: input.note?.trim() || undefined,
          };
          break;
        case "pledge_membership":
          action = {
            ...base,
            type: "pledge_membership",
            membershipType: input.membershipType?.trim() || undefined,
            note: input.note?.trim() || undefined,
          };
          break;
        case "donate":
          action = {
            ...base,
            type: "donate",
            amount: typeof input.amount === "number" ? input.amount : undefined,
            currency: input.currency?.trim() || undefined,
            note: input.note?.trim() || undefined,
          };
          break;
        case "champion":
          action = {
            ...base,
            type: "champion",
            note: input.note?.trim() || undefined,
          };
          break;
      }

      items[idx] = {
        ...items[idx],
        supportActions: [action, ...items[idx].supportActions],
      };

      saveAll(items);
      return items[idx];
    },
    remove(id) {
      const items = loadAll().filter((x) => x.id !== id);
      saveAll(items);
    },
    subscribe(cb) {
      if (typeof window === "undefined") return () => {};

      const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) cb();
      };
      const onCustom = () => cb();

      window.addEventListener("storage", onStorage);
      window.addEventListener("scis_store_updated", onCustom as EventListener);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("scis_store_updated", onCustom as EventListener);
      };
    },
  };
}
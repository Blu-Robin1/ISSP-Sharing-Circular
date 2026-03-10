export interface ScisInitiativeFromApi {
  id: string;
  title: string;
  description: string;
  project_type?: string;
  stage: number;
  stage_override?: number | null;
  location_lat?: number;
  location_lng?: number;
  lat?: number;
  lng?: number;
  status: string;
  stage3_milestones?: Record<string, unknown> | null;
  image_url?: string | null;
  supporter_count?: number;
  member_count?: number;
  champion_count?: number;
  volunteer_count?: number;
  donate_count?: number;
  created_at?: string;
}

export interface NormalizedInitiative {
  id: string;
  title: string;
  description: string;
  project_type?: string;
  stage: number;
  stage_override?: number | null;
  lat: number;
  lng: number;
  status: string;
  stage3_milestones?: Record<string, unknown> | null;
  image_url?: string | null;
  created_at?: string;
  supporter_count: number;
  member_count: number;
  champion_count: number;
  volunteer_count: number;
  donate_count: number;
}

function normalizeInitiative(i: ScisInitiativeFromApi): NormalizedInitiative {
  return {
    id: i.id,
    title: i.title,
    description: i.description,
    project_type: i.project_type,
    stage: Number(i.stage ?? 1),
    stage_override: i.stage_override ?? null,
    lat: Number(i.location_lat ?? i.lat ?? 0),
    lng: Number(i.location_lng ?? i.lng ?? 0),
    status: i.status ?? 'pending',
    stage3_milestones: i.stage3_milestones ?? null,
    image_url: i.image_url ?? null,
    created_at: (i as { created_at?: string }).created_at,
    supporter_count: Number(i.supporter_count ?? 0),
    member_count: Number(i.member_count ?? 0),
    champion_count: Number(i.champion_count ?? 0),
    volunteer_count: Number(i.volunteer_count ?? 0),
    donate_count: Number(i.donate_count ?? 0),
  };
}

export const scisService = {
  async getInitiatives(
    status: 'approved' | 'pending' | 'approved_and_pending' | 'all' = 'approved',
    noCache = false,
  ): Promise<NormalizedInitiative[]> {
    try {
      const url = noCache ? `/api/initiatives?status=${status}&_=${Date.now()}` : `/api/initiatives?status=${status}`;
      const res = await fetch(url, {
        credentials: 'include',
        ...(noCache ? { cache: 'no-store' as RequestCache } : {}),
      });
      const { initiatives } = (await res.json()) as { initiatives?: ScisInitiativeFromApi[] };
      const list = Array.isArray(initiatives) ? initiatives : [];
      return list.map(normalizeInitiative);
    } catch {
      return [];
    }
  },

  async createInitiative(input: {
    title: string;
    description: string;
    projectType?: string;
    lat: number;
    lng: number;
  }): Promise<NormalizedInitiative | null> {
    try {
      const res = await fetch('/api/initiatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        credentials: 'include',
      });
      const { initiative } = (await res.json()) as { initiative?: ScisInitiativeFromApi };
      return initiative ? normalizeInitiative(initiative) : null;
    } catch {
      return null;
    }
  },

  async addSupport(
    initiativeId: string,
    input: { name?: string; email?: string; postalCode?: string },
  ): Promise<boolean> {
    try {
      const res = await fetch(`/api/initiatives/${initiativeId}/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async addContribution(
    initiativeId: string,
    type: 'volunteer_skills' | 'pledge_membership' | 'donate' | 'champion',
    payload?: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      const res = await fetch(`/api/initiatives/${initiativeId}/contribution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload: payload ?? {} }),
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateInitiative(
    initiativeId: string,
    updates: {
      title?: string;
      description?: string;
      projectType?: string;
      status?: string;
      stageOverride?: number | null;
      stage3Milestones?: Record<string, unknown> | null;
    },
  ): Promise<boolean> {
    try {
      const res = await fetch(`/api/initiatives/${initiativeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async deleteInitiative(initiativeId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/initiatives/${initiativeId}`, { method: 'DELETE', credentials: 'include' });
      return res.ok;
    } catch {
      return false;
    }
  },

  /** Admin-only: fetch initiative with supporters and contributions */
  async getInitiativeDetails(initiativeId: string): Promise<{
    initiative: ScisInitiativeFromApi;
    supporters: { id: string; name: string | null; email: string | null; postal_code: string | null; created_at: string }[];
    contributions: { id: string; type: string; payload: Record<string, unknown> | null; created_at: string }[];
  } | null> {
    try {
      const res = await fetch(`/api/initiatives/${initiativeId}/details`, { credentials: 'include' });
      if (!res.ok) return null;
      return (await res.json()) as {
        initiative: ScisInitiativeFromApi;
        supporters: { id: string; name: string | null; email: string | null; postal_code: string | null; created_at: string }[];
        contributions: { id: string; type: string; payload: Record<string, unknown> | null; created_at: string }[];
      };
    } catch {
      return null;
    }
  },
};

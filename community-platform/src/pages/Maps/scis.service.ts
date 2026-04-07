export interface ScisInitiativeFromApi {
  id: string;
  title: string;
  description: string;
  project_type?: string;
  projectType?: string;
  stage: number;
  stage_override?: number | null;
  stageOverride?: number | null;
  location_lat?: number;
  location_lng?: number;
  lat?: number;
  lng?: number;
  status: string;
  stage3_milestones?: Record<string, unknown> | null;
  stage3Milestones?: Record<string, unknown> | null;
  image_url?: string | null;
  imageUrl?: string | null;
  supporter_count?: number;
  supporterCount?: number;
  member_count?: number;
  memberCount?: number;
  champion_count?: number;
  championCount?: number;
  volunteer_count?: number;
  volunteerCount?: number;
  donate_count?: number;
  donateCount?: number;
  created_at?: string;
  createdAt?: string;
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
    project_type: i.project_type ?? i.projectType,
    stage: Number(i.stage ?? 1),
    stage_override: i.stage_override ?? i.stageOverride ?? null,
    lat: Number(i.location_lat ?? i.lat ?? 0),
    lng: Number(i.location_lng ?? i.lng ?? 0),
    status:
      i.status ??
      ((i as { moderation?: string }).moderation === 'accepted'
        ? 'approved'
        : (i as { moderation?: string }).moderation === 'rejected'
          ? 'rejected'
          : 'pending'),
    stage3_milestones: i.stage3_milestones ?? i.stage3Milestones ?? null,
    image_url:
      i.image_url ??
      i.imageUrl ??
      ((i as { coverImage?: { publicUrl?: string } | null }).coverImage?.publicUrl ?? null) ??
      ((i as { cover_image?: { publicUrl?: string } | null }).cover_image?.publicUrl ?? null),
    created_at: i.created_at ?? i.createdAt,
    supporter_count: Number(i.supporter_count ?? i.supporterCount ?? 0),
    member_count: Number(i.member_count ?? i.memberCount ?? 0),
    champion_count: Number(i.champion_count ?? i.championCount ?? 0),
    volunteer_count: Number(i.volunteer_count ?? i.volunteerCount ?? 0),
    donate_count: Number(i.donate_count ?? i.donateCount ?? 0),
  };
}

export const scisService = {
  async getInitiatives(
    status: 'approved' | 'pending' | 'approved_and_pending' | 'all' = 'approved',
    noCache = false,
  ): Promise<NormalizedInitiative[]> {
    try {
      // Use projects API instead of initiatives API since initiatives functionality was transferred to projects
      const url = noCache ? `/api/projects?status=${status}&_=${Date.now()}` : `/api/projects?status=${status}`;
      const res = await fetch(url, {
        credentials: 'include',
        ...(noCache ? { cache: 'no-store' as RequestCache } : {}),
      });
      const payload = (await res.json()) as {
        projects?: ScisInitiativeFromApi[];
        items?: ScisInitiativeFromApi[];
      };
      const list = Array.isArray(payload.projects)
        ? payload.projects
        : Array.isArray(payload.items)
          ? payload.items
          : [];
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
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        credentials: 'include',
      });
      const { project } = (await res.json()) as { project?: ScisInitiativeFromApi };
      return project ? normalizeInitiative(project) : null;
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

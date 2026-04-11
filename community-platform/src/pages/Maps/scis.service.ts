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
      (i as { coverImage?: { publicUrl?: string } | null }).coverImage?.publicUrl ??
      (i as { cover_image?: { publicUrl?: string } | null }).cover_image?.publicUrl ??
      null,
    created_at: i.created_at ?? i.createdAt,
    supporter_count: Number(i.supporter_count ?? i.supporterCount ?? 0),
    member_count: Number(i.member_count ?? i.memberCount ?? 0),
    champion_count: Number(i.champion_count ?? i.championCount ?? 0),
    volunteer_count: Number(i.volunteer_count ?? i.volunteerCount ?? 0),
    donate_count: Number(i.donate_count ?? i.donateCount ?? 0),
  };
}

function toProjectSupportFormData(actionType: string, data: Record<string, unknown>) {
  const formData = new FormData();
  formData.append('actionType', actionType);
  formData.append('data', JSON.stringify(data));
  return formData;
}

function mapStatusToModeration(status?: string) {
  if (!status) return undefined;
  if (status === 'approved') return 'accepted';
  if (status === 'rejected') return 'rejected';
  return 'awaiting-moderation';
}

export const scisService = {
  async getInitiatives(
    status: 'approved' | 'pending' | 'approved_and_pending' | 'all' = 'approved',
    noCache = false,
  ): Promise<NormalizedInitiative[]> {
    try {
      const url = noCache
        ? `/api/projects?status=${status}&_=${Date.now()}`
        : `/api/projects?status=${status}`;
      const res = await fetch(url, {
        credentials: 'include',
        ...(noCache ? { cache: 'no-store' as RequestCache } : {}),
      });
      if (!res.ok) return [];

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
  }): Promise<{ ok: true; project: NormalizedInitiative } | { ok: false; error: string }> {
    try {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('description', input.description);
      // Published (not draft) so the initiative appears on the map; moderation is pending until admin review.
      formData.append('draft', 'false');
      formData.append('mapInitiative', 'true');
      formData.append('stepCount', '0');
      formData.append('lat', String(input.lat));
      formData.append('lng', String(input.lng));

      if (input.projectType) {
        formData.append('projectType', input.projectType);
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const body = (await res.json().catch(() => ({}))) as { project?: ScisInitiativeFromApi; error?: string };

      if (!res.ok) {
        const message =
          typeof body.error === 'string' && body.error.trim()
            ? body.error.trim()
            : res.status === 401
              ? 'Please sign in to submit an initiative.'
              : res.status === 409
                ? 'An initiative with this title already exists. Try a different title.'
                : 'Failed to save. Please try again.';
        return { ok: false, error: message };
      }

      if (!body.project) {
        return { ok: false, error: 'Server did not return the new initiative. Please try again.' };
      }

      return { ok: true, project: normalizeInitiative(body.project) };
    } catch {
      return { ok: false, error: 'Network error. Check your connection and try again.' };
    }
  },

  async addSupport(
    initiativeId: string,
    input: { name?: string; email?: string; postalCode?: string },
  ): Promise<boolean> {
    try {
      const formData = toProjectSupportFormData('add_my_name', {
        displayName: input.name?.trim() || undefined,
        email: input.email?.trim() || undefined,
        postalCode: input.postalCode?.trim() || undefined,
      });

      const res = await fetch(`/api/projects/${initiativeId}/support`, {
        method: 'POST',
        body: formData,
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
      const formData = toProjectSupportFormData(type, payload ?? {});
      const res = await fetch(`/api/projects/${initiativeId}/support`, {
        method: 'POST',
        body: formData,
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
      const res = await fetch(`/api/projects/${initiativeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          moderation: mapStatusToModeration(updates.status),
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        console.error('Failed to update project admin fields', await res.text());
      }

      return res.ok;
    } catch (error) {
      console.error('Failed to update project admin fields', error);
      return false;
    }
  },

  async deleteInitiative(initiativeId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/projects/${initiativeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  /** Admin-only: fetch project with supporters and contributions */
  async getInitiativeDetails(initiativeId: string): Promise<{
    initiative: ScisInitiativeFromApi;
    supporters: {
      id: string;
      name: string | null;
      email: string | null;
      postal_code: string | null;
      created_at: string;
    }[];
    contributions: {
      id: string;
      type: string;
      payload: Record<string, unknown> | null;
      created_at: string;
    }[];
  } | null> {
    try {
      const res = await fetch(`/api/projects/${initiativeId}/details`, { credentials: 'include' });
      if (!res.ok) return null;
      return (await res.json()) as {
        initiative: ScisInitiativeFromApi;
        supporters: {
          id: string;
          name: string | null;
          email: string | null;
          postal_code: string | null;
          created_at: string;
        }[];
        contributions: {
          id: string;
          type: string;
          payload: Record<string, unknown> | null;
          created_at: string;
        }[];
      };
    } catch {
      return null;
    }
  },
};

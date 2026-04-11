import type { SupabaseClient } from '@supabase/supabase-js';

export interface DBInitiative {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string;
  title: string;
  description: string;
  project_type: string;
  stage: number;
  stage_override: number | null;
  location_lat: number;
  location_lng: number;
  location_status: string;
  created_by_profile_id: number | null;
  status: string;
  stage3_milestones: Record<string, unknown> | null;
  image_url: string | null;
}

export interface InitiativeWithCounts extends DBInitiative {
  supporter_count: number;
  member_count: number;
  champion_count: number;
  volunteer_count: number;
  donate_count: number;
}

export class InitiativesServiceServer {
  constructor(private client: SupabaseClient) {}

  async list(statusFilter?: 'approved' | 'pending' | 'approved_and_pending' | 'all'): Promise<InitiativeWithCounts[]> {
    const tenantId = process.env.TENANT_ID!;
    let query = this.client
      .from('initiatives')
      .select('*')
      .eq('tenant_id', tenantId);

    if (statusFilter === 'approved') {
      query = query.eq('status', 'approved');
    } else if (statusFilter === 'pending') {
      query = query.eq('status', 'pending');
    } else if (statusFilter === 'approved_and_pending') {
      query = query.in('status', ['approved', 'pending']);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    const initiatives = (data ?? []) as DBInitiative[];

    const withCounts = await Promise.all(
      initiatives.map(async (i) => this.attachCounts(i)),
    );
    return withCounts;
  }

  async getById(id: string): Promise<InitiativeWithCounts | null> {
    const tenantId = process.env.TENANT_ID!;
    const { data, error } = await this.client
      .from('initiatives')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single();

    if (error || !data) return null;
    return this.attachCounts(data as DBInitiative);
  }

  private async attachCounts(i: DBInitiative): Promise<InitiativeWithCounts> {
    const [supports, contributions] = await Promise.all([
      this.client
        .from('initiative_supports')
        .select('id,email')
        .eq('initiative_id', i.id),
      this.client
        .from('initiative_contributions')
        .select('id,type,payload')
        .eq('initiative_id', i.id),
    ]);

    const supportRows = (supports.data ?? []) as { id: string; email: string | null }[];
    const contribRows = (contributions.data ?? []) as { id: string; type: string; payload: { email?: string } | null }[];

    const supporterCount = new Set(
      supportRows
        .filter((s) => s.email?.trim())
        .map((s) => s.email!.trim().toLowerCase()),
    ).size;

    const membershipContribs = contribRows.filter((c) => c.type === 'pledge_membership');
    const memberCount = new Set(
      membershipContribs.map((c) =>
        c.payload?.email?.trim()
          ? `e:${c.payload.email.trim().toLowerCase()}`
          : `id:${c.id}`,
      ),
    ).size;

    const championContribs = contribRows.filter((c) => c.type === 'champion');
    const championCount = new Set(
      championContribs.map((c) =>
        c.payload?.email?.trim()
          ? `e:${c.payload.email.trim().toLowerCase()}`
          : `id:${c.id}`,
      ),
    ).size;

    const volunteerCount = contribRows.filter((c) => c.type === 'volunteer_skills').length;
    const donateCount = contribRows.filter((c) => c.type === 'donate').length;

    return {
      ...i,
      supporter_count: supporterCount,
      member_count: memberCount,
      champion_count: championCount,
      volunteer_count: volunteerCount,
      donate_count: donateCount,
    };
  }

  async create(input: {
    title: string;
    description: string;
    projectType?: string;
    lat: number;
    lng: number;
    createdByProfileId?: number | null;
  }): Promise<DBInitiative> {
    const tenantId = process.env.TENANT_ID!;
    const { data, error } = await this.client
      .from('initiatives')
      .insert({
        tenant_id: tenantId,
        title: input.title.trim() || 'Untitled',
        description: input.description?.trim() ?? '',
        project_type: input.projectType ?? 'other',
        stage: 1,
        location_lat: input.lat,
        location_lng: input.lng,
        location_status: 'preliminary',
        created_by_profile_id: input.createdByProfileId ?? null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data as DBInitiative;
  }

  async update(
    id: string,
    updates: {
      title?: string;
      description?: string;
      projectType?: string;
      status?: 'pending' | 'approved' | 'rejected';
      stageOverride?: number | null;
      stage3Milestones?: Record<string, unknown> | null;
    },
  ): Promise<DBInitiative | null> {
    const tenantId = process.env.TENANT_ID!;
    const payload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.projectType !== undefined) payload.project_type = updates.projectType;
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.stageOverride !== undefined) payload.stage_override = updates.stageOverride;
    if (updates.stage3Milestones !== undefined) payload.stage3_milestones = updates.stage3Milestones;

    const { data, error } = await this.client
      .from('initiatives')
      .update(payload)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) return null;
    return data as DBInitiative;
  }

  async delete(id: string): Promise<boolean> {
    const tenantId = process.env.TENANT_ID!;
    const { error } = await this.client
      .from('initiatives')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    return !error;
  }

  async addSupport(
    initiativeId: string,
    input: { name?: string; email?: string; postalCode?: string; profileId?: number | null },
  ): Promise<void> {
    const { error } = await this.client.from('initiative_supports').insert({
      initiative_id: initiativeId,
      profile_id: input.profileId ?? null,
      name: input.name?.trim() ?? null,
      email: input.email?.trim() ?? null,
      postal_code: input.postalCode?.trim() ?? null,
    });

    if (error) throw error;
  }

  async listSupporters(initiativeId: string): Promise<{ id: string; name: string | null; email: string | null; postal_code: string | null; created_at: string }[]> {
    const { data, error } = await this.client
      .from('initiative_supports')
      .select('id,name,email,postal_code,created_at')
      .eq('initiative_id', initiativeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as { id: string; name: string | null; email: string | null; postal_code: string | null; created_at: string }[];
  }

  async listContributions(initiativeId: string): Promise<{ id: string; type: string; payload: Record<string, unknown> | null; created_at: string }[]> {
    const { data, error } = await this.client
      .from('initiative_contributions')
      .select('id,type,payload,created_at')
      .eq('initiative_id', initiativeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as { id: string; type: string; payload: Record<string, unknown> | null; created_at: string }[];
  }

  async addContribution(
    initiativeId: string,
    input: {
      type: string;
      profileId?: number | null;
      payload?: Record<string, unknown>;
    },
  ): Promise<void> {
    const { error } = await this.client.from('initiative_contributions').insert({
      initiative_id: initiativeId,
      profile_id: input.profileId ?? null,
      type: input.type,
      payload: input.payload ?? null,
    });

    if (error) throw error;
  }
}

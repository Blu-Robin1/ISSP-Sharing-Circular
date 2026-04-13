import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProjectSupportAction, ProjectSupportActionType } from 'oa-shared';

export interface DBProjectSupport {
  id: string;
  project_id: number;
  type: ProjectSupportActionType;
  created_at: string;
  user_id?: string;
  display_name?: string;
  email?: string;
  payload?: Record<string, unknown>;
}

export class ProjectSupportService {
  constructor(private client: SupabaseClient) {}

  async getByProjectId(projectId: number): Promise<ProjectSupportAction[]> {
    const { data, error } = await this.client
      .from('project_supports')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(this.mapFromDB);
  }

  async addSupport(input: {
    projectId: number;
    type: ProjectSupportActionType;
    userId?: string;
    displayName?: string;
    email?: string;
    payload?: Record<string, unknown>;
  }): Promise<ProjectSupportAction> {
    const { data, error } = await this.client
      .from('project_supports')
      .insert({
        project_id: input.projectId,
        type: input.type,
        user_id: input.userId,
        display_name: input.displayName,
        email: input.email,
        payload: input.payload,
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapFromDB(data as DBProjectSupport);
  }

  private mapFromDB(db: DBProjectSupport): ProjectSupportAction {
    const base = {
      id: db.id,
      projectId: db.project_id,
      type: db.type,
      createdAt: db.created_at,
      userId: db.user_id,
      displayName: db.display_name,
      email: db.email,
    };

    switch (db.type) {
      case 'add_my_name':
        return { ...base, type: 'add_my_name' };
      case 'volunteer_skills':
        return {
          ...base,
          type: 'volunteer_skills',
          skills: (db.payload?.skills as string[]) || [],
          note: db.payload?.note as string,
        };
      case 'pledge_membership':
        return {
          ...base,
          type: 'pledge_membership',
          membershipType: db.payload?.membershipType as string,
          note: db.payload?.note as string,
        };
      case 'donate':
        return {
          ...base,
          type: 'donate',
          amount: db.payload?.amount as number,
          currency: db.payload?.currency as string,
          note: db.payload?.note as string,
        };
      case 'champion':
        return {
          ...base,
          type: 'champion',
          note: db.payload?.note as string,
        };
      default:
        throw new Error(`Unknown support action type: ${db.type}`);
    }
  }
}

export const projectSupportService = {
  getByProjectId: (client: SupabaseClient, projectId: number) =>
    new ProjectSupportService(client).getByProjectId(projectId),

  addSupport: (
    client: SupabaseClient,
    projectId: number,
    type: ProjectSupportActionType,
    data: any,
  ) => {
    // Extract user info from data or use anonymous
    const { userId, displayName, email, ...payload } = data;

    return new ProjectSupportService(client).addSupport({
      projectId,
      type,
      userId,
      displayName,
      email,
      payload,
    });
  },
};

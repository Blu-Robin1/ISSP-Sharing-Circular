import type { SupabaseClient, User } from '@supabase/supabase-js';

type CreateProfileArgs = {
  user: User;
  username: string;
};

const createUserProfile = async (args: CreateProfileArgs, client: SupabaseClient) => {
  const tenantId = process.env.TENANT_ID;
  if (!tenantId) {
    return {
      data: null,
      error: { message: 'TENANT_ID is not configured', code: 'TENANT_ID_MISSING', details: '' },
    };
  }

  const { data: typeData, error: typeError } = await client
    .from('profile_types')
    .select('id')
    .eq('name', 'member')
    .eq('tenant_id', tenantId)
    .limit(1);

  if (typeError) {
    console.error('[createUserProfile] profile_types error:', typeError);
    return { data: null, error: typeError };
  }

  const memberTypeId = typeData?.[0]?.id;
  if (memberTypeId == null) {
    console.error(
      `[createUserProfile] No profile_type "member" for tenant_id="${tenantId}". ` +
        'Apply migrations or run supabase/scripts/fix-sign-up-issues.sql for this tenant.',
    );
    return {
      data: null,
      error: { message: 'Default member type not found', code: 'MEMBER_TYPE_MISSING', details: '' },
    };
  }

  return await client.from('profiles').insert({
    auth_id: args.user.id,
    username: args.username,
    display_name: args.username,
    tenant_id: tenantId,
    profile_type: memberTypeId,
  });
};

const isUsernameAvailable = async (username: string, client: SupabaseClient) => {
  const result = await client.rpc('is_username_available', { username });
  return result.data;
};

export const authServiceServer = {
  createUserProfile,
  isUsernameAvailable,
};

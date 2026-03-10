import type { SupabaseClient, User } from '@supabase/supabase-js';

type CreateProfileArgs = {
  user: User;
  username: string;
};

const createUserProfile = async (args: CreateProfileArgs, client: SupabaseClient) => {
  const { data: typeData, error: typeError } = await client
    .from('profile_types')
    .select('id')
    .eq('name', 'member')
    .limit(1);

  if (typeError) {
    console.error('[createUserProfile] profile_types error:', typeError);
    return { data: null, error: typeError };
  }

  const memberTypeId = typeData?.[0]?.id;
  if (memberTypeId == null) {
    console.error('[createUserProfile] No profile_type with name "member" found');
    return {
      data: null,
      error: { message: 'Default member type not found', code: 'MEMBER_TYPE_MISSING', details: '' },
    };
  }

  return await client.from('profiles').insert({
    auth_id: args.user.id,
    username: args.username,
    display_name: args.username,
    tenant_id: process.env.TENANT_ID,
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

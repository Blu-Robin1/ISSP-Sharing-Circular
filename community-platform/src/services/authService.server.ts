import type { SupabaseClient, User } from '@supabase/supabase-js';

type CreateProfileArgs = {
  user: User;
  username: string;
};

const createUserProfile = async (args: CreateProfileArgs, client: SupabaseClient) => {
  // Should add more typing here about the required fields needed to create a profile

  const { data, error } = await client.from('profile_types').select('*').eq('name', 'member').limit(1);

  if (error || !data || data.length === 0) {
    // console.error(error);
    throw new Error('Default member type not found');
  }

  return await client.from('profiles').insert({
    auth_id: args.user.id,
    username: args.username,
    display_name: args.username,
    tenant_id: process.env.TENANT_ID,
    profile_type: data[0].id,
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

// import type { SupabaseClient, User } from '@supabase/supabase-js';

// type CreateProfileArgs = {
//   user: User;
//   username: string;
// };

// const createUserProfile = async (args: CreateProfileArgs, client: SupabaseClient) => {
//   // Should add more typing here about the required fields needed to create a profile
//   const { data, error } = await client.from('profile_types').select('*').eq('name', 'member');
//   console.log("TESTTTTTTTTT")
//   // console.log(data);
//   if (error) {
//     console.error(error);
//     throw 'Default member type not found';
//   }
  
//   console.log(args);
//   // TODO: figure out how to pull the username out of args
//   // because args.user.username does not exist...its inside the 
//   // usermetadata
//   // TODO: double check if the profile_types query above is actually working and your getting a response back
//   return await client.from('profiles').insert({
//     auth_id: args.user.id,
//     // @ts-ignore
//     username: args.user.email,
//     // @ts-ignore
//     display_name: args.user.email,
//     tenant_id: process.env.TENANT_ID,
//     // profile_type: data[0].id,
//     profile_type: "user"
//   });
// };

// const isUsernameAvailable = async (username: string, client: SupabaseClient) => {
//   const result = await client.rpc('is_username_available', { username });
//   return result.data;
// };

// export const authServiceServer = {
//   createUserProfile,
//   isUsernameAvailable,
// };

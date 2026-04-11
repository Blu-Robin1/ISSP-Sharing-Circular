import type { DBProfile } from 'oa-shared';
import { describe, expect, it } from 'vitest';
import { ProfileFactory } from './profileFactory.server';

const mockClient = {
  storage: {
    from: () => ({
      getPublicUrl: () => ({ data: { publicUrl: 'https://example.com/image.png' } }),
    }),
  },
} as any;

const createDbProfile = (overrides: Partial<DBProfile> = {}) =>
  ({
    id: 1,
    created_at: new Date('2024-01-01T00:00:00.000Z'),
    auth_id: 'auth-1',
    username: 'jane',
    display_name: 'Jane Doe',
    city: 'Vancouver',
    about: 'About Jane',
    photo: null,
    cover_images: null,
    roles: null,
    impact: null,
    visitor_policy: null,
    is_blocked_from_messaging: false,
    is_contactable: true,
    last_active: null,
    website: null,
    patreon: undefined,
    total_views: 0,
    profile_type: 1,
    donations_enabled: false,
    type: {
      id: 1,
      name: 'member',
      display_name: 'Member',
      description: 'Member profile',
      map_pin_name: 'member',
      is_space: false,
    } as any,
    ...overrides,
  }) as DBProfile;

describe('ProfileFactory', () => {
  it('maps the database city onto the profile model', () => {
    const profile = new ProfileFactory(mockClient).fromDB(createDbProfile());

    expect(profile.city).toBe('Vancouver');
  });
});

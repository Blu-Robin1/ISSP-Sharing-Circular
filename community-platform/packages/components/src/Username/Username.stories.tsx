import { faker } from '@faker-js/faker';

import { Username } from './Username';

import type { Meta } from '@storybook/react-vite';
import type { Author } from 'oa-shared';

export default {
  title: 'Components/Username',
  component: Username,
} as Meta<typeof Username>;

export const NoBadge = {
  args: {
    user: {
      city: 'Lisbon',
      username: 'a-username',
    } as Author,
  },
};

export const OneBadge = {
  args: {
    user: {
      username: 'a-username',
      city: 'Lisbon',
      badges: [
        {
          id: 1,
          name: 'pro',
          displayName: 'PRO',
          imageUrl: faker.image.avatar(),
        },
      ],
    } as Author,
  },
};

export const TwoBadges = {
  args: {
    user: {
      city: 'Lisbon',
      username: 'a-username',
      badges: [
        {
          id: 1,
          name: 'pro',
          displayName: 'PRO',
          imageUrl: faker.image.avatar(),
        },
        {
          id: 2,
          name: 'supporter',
          displayName: 'Supporter',
          actionUrl: faker.internet.url(),
          imageUrl: faker.image.avatar(),
        },
      ],
    } as Author,
  },
};

export const WithoutLocation = {
  args: {
    user: {
      username: 'a-username',
    } as Author,
  },
};

export const WithLocation = {
  args: {
    user: {
      username: 'a-username',
      city: 'Tokyo',
    } as Author,
  },
};

export const InlineStyles = {
  args: {
    user: {
      username: 'a-username',
    } as Author,
    sx: {
      outline: '10px solid red',
    },
  },
};

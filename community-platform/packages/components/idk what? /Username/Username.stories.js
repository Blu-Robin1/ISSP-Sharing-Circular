import { faker } from '@faker-js/faker';
import { Username } from './Username';
export default {
    title: 'Components/Username',
    component: Username,
};
export const NoBadge = {
    args: {
        user: {
            country: 'pt',
            username: 'a-username',
        },
    },
};
export const OneBadge = {
    args: {
        user: {
            username: 'a-username',
            country: 'pt',
            badges: [
                {
                    id: 1,
                    name: 'pro',
                    displayName: 'PRO',
                    imageUrl: faker.image.avatar(),
                },
            ],
        },
    },
};
export const TwoBadges = {
    args: {
        user: {
            country: 'pt',
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
        },
    },
};
export const WithoutFlag = {
    args: {
        user: {
            username: 'a-username',
        },
    },
};
export const InvalidCountryCode = {
    args: {
        user: {
            username: 'a-username',
            country: 'zz',
        },
    },
};
export const InlineStyles = {
    args: {
        user: {
            username: 'a-username',
        },
        sx: {
            outline: '10px solid red',
        },
    },
};

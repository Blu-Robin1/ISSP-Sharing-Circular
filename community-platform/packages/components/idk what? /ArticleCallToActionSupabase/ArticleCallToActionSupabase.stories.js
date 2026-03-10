import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { Button } from '../Button/Button';
import { UsefulStatsButton } from '../UsefulStatsButton/UsefulStatsButton';
import { ArticleCallToActionSupabase } from './ArticleCallToActionSupabase';
export default {
    title: 'Layout/ArticleCallToActionSupabase',
    component: ArticleCallToActionSupabase,
};
export const ArticleCallToActionSupabaseCommentAndUseful = () => (_jsxs(ArticleCallToActionSupabase, { author: makeFakeUser(), children: [_jsx(Button, { sx: { fontSize: 2 }, children: "Leave a comment" }), _jsx(UsefulStatsButton, { isLoggedIn: false, hasUserVotedUseful: false, onUsefulClick: () => Promise.resolve() })] }));
export const ArticleCallToActionSupabaseUseful = () => (_jsx(ArticleCallToActionSupabase, { author: makeFakeUser(), children: _jsx(UsefulStatsButton, { isLoggedIn: false, hasUserVotedUseful: false, onUsefulClick: () => Promise.resolve() }) }));
export const ArticleCallToActionSupabaseSingleContributor = () => (_jsx(ArticleCallToActionSupabase, { author: makeFakeUser(), contributors: [
        {
            id: faker.number.int(),
            country: faker.location.countryCode(),
            displayName: faker.person.firstName(),
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
            photo: {
                id: faker.string.uuid(),
                publicUrl: faker.image.avatar(),
            },
            username: faker.internet.username(),
        },
    ], children: _jsx(Button, { children: "Action" }) }));
const makeFakeUser = () => ({
    id: faker.number.int(),
    country: faker.location.countryCode(),
    displayName: faker.person.firstName(),
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
    photo: {
        id: faker.string.uuid(),
        publicUrl: faker.image.avatar(),
    },
    username: faker.internet.username(),
});
export const ArticleCallToActionSupabaseMultipleContributors = () => (_jsx(ArticleCallToActionSupabase, { author: makeFakeUser(), contributors: faker.helpers.uniqueArray(makeFakeUser, Math.floor(Math.random() * 10)), children: _jsx(Button, { children: "Action" }) }));

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { Box, Button } from 'theme-ui';
import { ArticleCallToActionSupabase, UsefulStatsButton } from '..';
import { UserEngagementWrapper } from './UserEngagementWrapper';
export default {
    title: 'Layout/UserEngagementWrapper',
    component: UserEngagementWrapper,
};
export const Default = () => (_jsx(Box, { sx: { maxWidth: '1000px', margin: '0 auto' }, children: _jsx(UserEngagementWrapper, { children: _jsx(Box, { sx: { margin: 3 }, children: _jsxs(ArticleCallToActionSupabase, { author: {
                    username: 'library._createdBy',
                    country: 'US',
                    displayName: 'display name',
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
                    id: 1,
                    photo: null,
                }, children: [_jsx(Button, { sx: { fontSize: 2 }, onClick: () => null, children: "Leave a comment" }), _jsx(UsefulStatsButton, { hasUserVotedUseful: false, isLoggedIn: false, onUsefulClick: () => new Promise(() => { }) })] }) }) }) }));

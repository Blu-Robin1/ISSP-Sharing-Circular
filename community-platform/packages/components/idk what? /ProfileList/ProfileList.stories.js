import { jsx as _jsx } from "react/jsx-runtime";
import { ProfileList } from './ProfileList';
export default {
    title: 'Components/ProfileList',
    component: ProfileList,
};
const mockProfiles = [
    {
        id: 1,
        username: 'test_user',
        displayName: 'Test User',
        photo: null,
        country: 'USA',
        badges: [],
        type: null,
    },
    {
        id: 2,
        username: 'example_user',
        displayName: 'Example User',
        photo: null,
        country: 'UK',
        badges: [],
        type: null,
    },
];
export const Default = () => (_jsx(ProfileList, { profiles: mockProfiles, header: "Profile List" }));

import { jsx as _jsx } from "react/jsx-runtime";
import { ProfileTagsList } from './ProfileTagsList';
export default {
    title: 'Components/ProfileTagsList',
    component: ProfileTagsList,
};
export const Default = () => (_jsx(ProfileTagsList, { tags: [
        {
            id: 1,
            createdAt: new Date(),
            name: 'Electronics',
            profileType: 'space',
        },
        {
            id: 2,
            createdAt: new Date(),
            name: 'Graphic Design',
            profileType: 'member',
        },
    ], isSpace: false }));

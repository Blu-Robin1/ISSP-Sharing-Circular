import { jsx as _jsx } from "react/jsx-runtime";
import { ProfileBadgeContentLabel } from './ProfileBadgeContentLabel';
export default {
    title: 'Components/ProfileBadgeContentLabel',
    component: ProfileBadgeContentLabel,
};
export const Default = () => {
    const profileBadge = {
        id: 1,
        name: 'prop',
        displayName: 'PRO',
        imageUrl: 'https://wbskztclbriekwpehznv.supabase.co/storage/v1/object/public/one-army/icons/pro.svg',
    };
    return _jsx(ProfileBadgeContentLabel, { profileBadge: profileBadge });
};

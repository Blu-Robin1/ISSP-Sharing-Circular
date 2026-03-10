import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { UserBadge } from '../Username/UserBadge';
export const ProfileBadgeContentLabel = ({ profileBadge }) => {
    return (_jsxs(Flex, { "data-cy": "profileBadge", sx: {
            alignItems: 'center',
            fontSize: 1,
            color: '#555555',
            backgroundColor: 'softblue',
            paddingX: 1,
            paddingY: 1,
            borderRadius: 1,
            gap: 1,
        }, children: [_jsx(UserBadge, { badge: profileBadge }), _jsx(Text, { children: "only news" })] }));
};

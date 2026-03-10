import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { Divider, Flex, Text } from 'theme-ui';
export const MemberHistory = (props) => {
    const memberSince = useMemo(() => {
        try {
            if (props.memberSince) {
                return new Date(props.memberSince).getFullYear().toString();
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }, [props.memberSince]);
    const lastActive = useMemo(() => {
        try {
            if (props.lastActive) {
                return formatDistanceToNow(new Date(props.lastActive), {
                    addSuffix: true,
                });
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }, [props.lastActive]);
    return (_jsxs(Flex, { "data-cy": "MemberHistory", sx: {
            gap: 2,
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }, children: [memberSince && (_jsxs(Text, { variant: "quiet", sx: { fontSize: 1 }, children: ["Member since ", memberSince] })), memberSince && lastActive && (_jsx(Divider, { sx: {
                    display: ['none', 'none', 'block'],
                    width: '1px',
                    height: 'auto',
                    alignSelf: 'stretch',
                    border: '2px solid #0000001A',
                    m: 0,
                } })), lastActive && (_jsxs(Text, { variant: "quiet", sx: { fontSize: 1 }, children: ["Last active ", lastActive] }))] }));
};

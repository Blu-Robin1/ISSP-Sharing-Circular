import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, Flex } from 'theme-ui';
import defaultProfileImage from '../../assets/images/default_member.svg';
import { MemberBadge } from '../MemberBadge/MemberBadge';
import { ProfileTagsList } from '../ProfileTagsList/ProfileTagsList';
import { Username } from '../Username/Username';
export const CardDetailsMemberProfile = ({ profile, isLink }) => {
    const photoUrl = profile.photo?.publicUrl;
    return (_jsxs(Flex, { "data-testid": "CardDetailsMemberProfile", sx: {
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            alignContent: 'stretch',
        }, children: [_jsx(Box, { sx: { aspectRatio: 1, width: '60px', height: '60px' }, children: _jsxs(Flex, { sx: {
                        alignContent: 'flex-start',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                    }, children: [_jsx(Avatar, { src: photoUrl || defaultProfileImage, sx: { width: '60px', height: '60px', objectFit: 'cover' }, loading: "lazy" }), _jsx(MemberBadge, { profileType: profile.type || undefined, size: 22, sx: { transform: 'translateY(-22px)' } })] }) }), _jsxs(Flex, { sx: { flexDirection: 'column', gap: 1, flex: 1 }, children: [_jsx(Username, { user: profile, sx: { alignSelf: 'flex-start' }, isLink: isLink, target: "_blank" }), profile.tags && profile.tags.length > 0 && (_jsx(ProfileTagsList, { tags: profile.tags, isSpace: false }))] })] }));
};

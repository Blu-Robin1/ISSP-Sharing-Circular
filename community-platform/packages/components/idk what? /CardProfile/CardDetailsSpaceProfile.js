import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Image, Text } from 'theme-ui';
import { MemberBadge } from '../MemberBadge/MemberBadge';
import { ProfileTagsList } from '../ProfileTagsList/ProfileTagsList';
import { Username } from '../Username/Username';
export const CardDetailsSpaceProfile = ({ profile, isLink }) => {
    const coverImage = profile.coverImages && profile.coverImages[0] && profile.coverImages[0]?.publicUrl;
    const profileUrl = profile.photo?.publicUrl;
    const hasImage = coverImage || profileUrl;
    const aboutText = profile.about && profile.about.length > 80 ? profile.about.slice(0, 78) + '...' : profile.about;
    return (_jsxs(Flex, { "data-testid": "CardDetailsSpaceProfile", sx: { flexDirection: 'column', width: '100%' }, children: [hasImage && (_jsxs(_Fragment, { children: [_jsx(Flex, { sx: { aspectRatio: 16 / 6, overflow: 'hidden' }, children: _jsx(Image, { src: coverImage || profileUrl, sx: {
                                aspectRatio: 16 / 6,
                                alignSelf: 'stretch',
                                objectFit: 'cover',
                            }, loading: "lazy" }) }), _jsx(Box, { sx: {
                            position: 'relative',
                            height: 0,
                            top: '-20px',
                            width: '100%',
                        }, children: _jsx(MemberBadge, { profileType: profile.type || undefined, size: 40, sx: {
                                float: 'right',
                                marginX: 2,
                            } }) })] })), _jsxs(Flex, { sx: {
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    gap: 1,
                    padding: 2,
                }, children: [_jsxs(Flex, { sx: { gap: 2 }, children: [!hasImage && _jsx(MemberBadge, { profileType: profile.type || undefined, size: 30 }), _jsx(Username, { user: profile, sx: { alignSelf: 'flex-start' }, isLink: isLink, target: "_blank" })] }), profile.tags && profile.tags.length > 0 && (_jsx(ProfileTagsList, { tags: profile.tags, isSpace: true })), aboutText && (_jsx(Text, { variant: "quiet", sx: { fontSize: 2, wordBreak: 'break-word' }, children: aboutText }))] })] }));
};

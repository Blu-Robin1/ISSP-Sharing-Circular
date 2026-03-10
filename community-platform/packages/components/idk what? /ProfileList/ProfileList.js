import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, Flex, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { MemberBadge } from '../MemberBadge/MemberBadge';
import { Username } from '../Username/Username';
export const ProfileList = ({ profiles = [], onClose, header }) => {
    return (_jsx(Flex, { "data-cy": "profile-list-modal", sx: {
            position: 'fixed',
            inset: 0,
            bg: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }, onClick: onClose, children: _jsxs(Box, { sx: {
                bg: 'background',
                borderRadius: '10px',
                width: ['80%', '23%'],
                height: 'auto',
                maxHeight: ['40%', '50%'],
                border: '2px solid',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }, onClick: (e) => e.stopPropagation(), children: [_jsxs(Flex, { sx: {
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '2px solid',
                        borderColor: 'muted',
                        p: 1,
                        width: '100%',
                        position: 'relative',
                    }, children: [_jsx(Text, { sx: {
                                fontWeight: 600,
                                fontSize: 2,
                                textAlign: 'center',
                                width: '100%',
                            }, children: header }), _jsx(Button, { variant: "subtle", showIconOnly: true, icon: "close", small: true, onClick: onClose })] }), _jsx(Box, { sx: {
                        flex: '1 1 auto',
                        overflowY: 'auto',
                        pl: 3,
                    }, children: profiles.length === 0 ? (_jsx(Text, { sx: { textAlign: 'center', color: 'muted', fontSize: 1 }, children: "No users yet." })) : (_jsx(Box, { as: "ul", sx: {
                            listStyle: 'none',
                            m: 0,
                            p: 0,
                        }, children: profiles.map((profile) => (_jsxs(Flex, { as: "li", sx: {
                                alignItems: 'center',
                                py: 2,
                                gap: 2,
                            }, children: [profile.photo ? (_jsx(Avatar, { src: profile.photo?.publicUrl, sx: {
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }, loading: "lazy" })) : (_jsx(MemberBadge, { profileType: profile.type || undefined, sx: { cursor: 'pointer' } })), _jsx(Box, { children: _jsx(Username, { user: profile }) })] }, profile.id))) })) })] }) }));
};

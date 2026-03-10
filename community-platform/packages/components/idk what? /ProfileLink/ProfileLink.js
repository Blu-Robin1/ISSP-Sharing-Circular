import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex } from 'theme-ui';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Icon } from '../Icon/Icon';
export const ProfileLink = (props) => {
    return (_jsxs(Flex, { sx: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            mt: 0,
            ...props.sx,
        }, children: [_jsx(Box, { children: _jsx(Icon, { glyph: "website", size: 22 }) }), _jsx(ExternalLink, { marginLeft: 2, color: "black", "data-cy": "profile-website", href: props.url, children: props.url })] }));
};

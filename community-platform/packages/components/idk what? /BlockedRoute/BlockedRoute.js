import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { InternalLink } from '../InternalLink/InternalLink';
export const BlockedRoute = (props) => {
    const redirectLabel = props.redirectLabel || 'Back to home';
    const redirectUrl = props.redirectUrl || '/';
    return (_jsxs(Flex, { sx: { justifyContent: 'center', flexDirection: 'column', mt: 8 }, "data-cy": "BlockedRoute", children: [_jsx(Text, { sx: { width: '100%', textAlign: 'center' }, children: props.children }), _jsx(Box, { sx: { textAlign: 'center', mt: 2 }, children: _jsx(InternalLink, { to: redirectUrl, children: _jsx(Button, { type: "button", variant: "subtle", small: true, children: redirectLabel }) }) })] }));
};

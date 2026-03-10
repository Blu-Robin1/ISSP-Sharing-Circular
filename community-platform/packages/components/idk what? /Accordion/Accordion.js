import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Flex, Heading, Text } from 'theme-ui';
import { Icon } from '../Icon/Icon';
export const Accordion = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { children, sx, title, subtitle } = props;
    return (_jsxs(Flex, { "data-cy": "accordionContainer", sx: { flexDirection: 'column', gap: 2, cursor: 'pointer', ...sx }, onClick: () => {
            if (!isExpanded) {
                setIsExpanded(true);
            }
        }, children: [_jsxs(Flex, { sx: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, onClick: () => setIsExpanded(!isExpanded), children: [_jsx(Heading, { as: "h3", variant: "small", children: title }), _jsx(Icon, { glyph: isExpanded ? 'arrow-full-up' : 'arrow-full-down' })] }), subtitle != undefined && _jsx(Text, { sx: { fontSize: 1, color: 'gray' }, children: subtitle }), isExpanded && children] }));
};

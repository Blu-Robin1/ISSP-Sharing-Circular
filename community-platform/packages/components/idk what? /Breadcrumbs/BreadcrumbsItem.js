import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router';
import { Box, Text } from 'theme-ui';
import { Button } from '../Button/Button';
const BreadcrumbButton = ({ text, link }) => {
    return link ? (_jsx(Link, { to: link, children: _jsx(Button, { type: "button", variant: "breadcrumb", children: text }) })) : (_jsx(Button, { type: "button", variant: "breadcrumb", children: text }));
};
export const BreadcrumbItem = ({ text, link, isLast }) => (_jsx(Box, { style: {
        display: 'inline-flex',
        ...(isLast && {
            flex: '1',
            maxWidth: '100%',
        }),
    }, "data-testid": "breadcrumbsItem", "data-cy": "breadcrumbsItem", children: !isLast ? (_jsx(BreadcrumbButton, { link: link, text: text })) : (_jsx(Text, { sx: {
            display: 'block',
            color: 'black',
            fontSize: [2, 3],
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
            padding: 1,
            paddingX: 3,
        }, children: text })) }));

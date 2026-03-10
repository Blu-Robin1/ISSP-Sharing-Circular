import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import { BreadcrumbItem } from './BreadcrumbsItem';
export const Breadcrumbs = ({ steps }) => {
    return (_jsx(Flex, { sx: {
            alignItems: 'center',
            width: '100%',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        }, children: steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (_jsxs(Flex, { sx: {
                    alignItems: 'center',
                    flexShrink: isLast ? 1 : 0,
                    ...(isLast && { flex: '1' }),
                }, children: [_jsx(BreadcrumbItem, { text: step.text, link: step.link, isLast: isLast }), !isLast && _jsx(Icon, { glyph: "chevron-right", color: "black", "data-testid": "breadcrumbsChevron" })] }, index));
        }) }));
};

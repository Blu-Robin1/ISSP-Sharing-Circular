import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Flex, Grid, Text } from 'theme-ui';
import { Icon } from '../Icon/Icon';
export const GridForm = ({ fields }) => {
    return (_jsx(_Fragment, { children: fields.map((field, index) => (_jsxs(Grid, { gap: 2, columns: [2, '80% 20%'], sx: {
                borderRadius: 1,
                background: index % 2 == 0 ? 'softblue' : 'white',
                padding: 4,
            }, "data-cy": `field: ${field.name}`, children: [_jsxs(Flex, { sx: { gap: 2 }, children: [_jsx(Icon, { glyph: field.glyph, size: 20 }), _jsxs(Box, { children: [_jsx(Text, { as: "h4", children: field.name }), _jsx(Text, { sx: { color: 'GrayText', fontSize: 2 }, children: field.description })] })] }), _jsx(Flex, { sx: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, children: field.component })] }, index))) }));
};

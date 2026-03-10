import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Flex, Heading, Text } from 'theme-ui';
export const Guidelines = ({ title, steps }) => {
    return (_jsx(Card, { children: _jsxs(Flex, { sx: { flexDirection: 'column', padding: [2, 3, 4], gap: 1 }, children: [_jsx(Heading, { as: "h2", mb: 2, children: title }), steps.map((step, index) => {
                    return (_jsxs(Text, { variant: "auxiliary", children: [`${index + 1}. `, " ", step] }, index));
                })] }) }));
};

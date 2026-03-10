import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Heading } from 'theme-ui';
import { MoreContainer } from './MoreContainer';
export default {
    title: 'Layout/MoreContainer',
    component: MoreContainer,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'twitter',
            values: [
                { name: 'twitter', value: '#00aced' },
                { name: 'facebook', value: '#3b5998' },
            ],
        },
    },
};
export const Default = () => (_jsx(MoreContainer, { m: '0 auto', pt: 60, pb: 90, children: _jsxs(Flex, { sx: {
            alignItems: 'center',
            flexDirection: 'column',
        }, mt: 5, children: [_jsx(Heading, { children: "Some heading" }), _jsx(_Fragment, { children: "Some content" })] }) }));

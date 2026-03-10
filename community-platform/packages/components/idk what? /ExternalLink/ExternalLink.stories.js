import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'theme-ui';
import { Icon } from '..';
import { ExternalLink } from './ExternalLink';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/ExternalLink',
    component: ExternalLink,
};
export const Basic = () => (_jsx(ExternalLink, { href: "#", children: "Link Text" }));
export const Styled = () => (_jsx(ExternalLink, { href: "#", color: "black", sx: { textDecoration: 'underline' }, children: "Link Text" }));
export const WithIcon = () => (_jsxs(ExternalLink, { href: "#", children: [_jsx(Text, { children: "Link Text" }), _jsx(Icon, { glyph: "external-url", ml: [1] })] }));
